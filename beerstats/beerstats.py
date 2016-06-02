import logging
import os
import sys

# Hack to include shared module dir in module search path
sys.path.append(os.path.realpath(os.path.join(os.path.dirname(os.path.realpath(__file__)), "..", "shared")))

import time
from datetime import datetime, timedelta, timezone
from PIL import Image, ImageDraw, ImageFont
from keg_dataaccess import KegDataAccess
from keg_math import get_whole_pint_count
from SSD1306 import SSD1306_128_64
from keg_logging import init_logging


class OledBeerDisplay:
    def __init__(self, beer_name):
        # Set up fonts to be used by the display
        current_dir = os.path.realpath(os.path.dirname(__file__))
        verdana_absolute_path = os.path.realpath(os.path.join(current_dir, "fonts", "Verdana.ttf"))

        self.stats_font = ImageFont.truetype(verdana_absolute_path, 24)
        self.beer_name_font_path = verdana_absolute_path
        self.beer_name_font = ImageFont.truetype(self.beer_name_font_path, 28)

        # Set up some vars to determine text positioning
        self.beer_name = beer_name
        self.stats_text_y_start_position = 39
        self.beers_remaining_text_area_width = 30
        self.liters_remaining_text_area_width = 68

        # SSD1306 library init/setup
        self.oled = SSD1306_128_64(rst=24, i2c_address=0x3C)
        self.oled.begin()
        self.oled.clear()
        self.oled.display()
        self.image = Image.new("1", (self.oled.width, self.oled.height))
        self.draw = ImageDraw.Draw(self.image)

        # Draw the overlay and beer name (i.e. the basics) during init
        self.draw_overlay()
        self.draw_beer_name_with_resize()
        self.update_display()

    def draw_overlay(self):
        current_dir = os.path.realpath(os.path.dirname(__file__))
        overlay_absolute_path = os.path.realpath(os.path.join(current_dir, "images", "main_overlay.ppm"))
        self.image = Image.open(overlay_absolute_path).convert("1")

        # Update self.draw reference to new Draw object for just-loaded image
        self.draw = ImageDraw.Draw(self.image)

    def draw_beers_remaining(self, beers_remaining):
        formatted_beers_remaining = str(beers_remaining)
        w, h = self.draw.textsize(str(beers_remaining), self.stats_font)

        self.draw.text((self.beers_remaining_text_area_width - w,
                        self.stats_text_y_start_position),
                       formatted_beers_remaining,
                       font=self.stats_font,
                       fill=255)

    def draw_liters_remaining(self, liters_remaining):
        formatted_liters_remaining = "{:>.2f}L".format(liters_remaining)
        w, h = self.draw.textsize(formatted_liters_remaining, self.stats_font)
        liters_remaining_start_position = 60 + self.liters_remaining_text_area_width - w

        self.draw.text((liters_remaining_start_position, self.stats_text_y_start_position),
                       formatted_liters_remaining,
                       font=self.stats_font,
                       fill=255)

    def draw_beer_name(self):
        w, h = self.draw.textsize(str(self.beer_name), self.beer_name_font)
        total_margin = self.oled.width - w
        self.draw.text((total_margin / 2, 0), self.beer_name, font=self.beer_name_font, fill=255)

    def draw_beer_name_with_resize(self):
        beer_name_font_size = 28
        self.beer_name_font = ImageFont.truetype(self.beer_name_font_path, beer_name_font_size)

        w, h = self.draw.textsize(str(self.beer_name), self.beer_name_font)
        while w > self.oled.width:
            beer_name_font_size -= 1
            self.beer_name_font = ImageFont.truetype(self.beer_name_font_path, beer_name_font_size)
            w, h = self.draw.textsize(str(self.beer_name), self.beer_name_font)

        self.draw_beer_name()

    def update_display(self):
        self.oled.image(self.image)
        self.oled.display()

    def clear_display(self):
        self.oled.clear()
        self.oled.display()

    def clear_beers_remaining(self):
        self.draw.rectangle([(0, self.stats_text_y_start_position), (30, self.oled.height)], fill=0)
        self.oled.display()

    def clear_liters_remaining(self):
        self.draw.rectangle([(60, self.stats_text_y_start_position), (self.oled.width, self.oled.height)], fill=0)

    def clear_beer_name(self):
        self.draw.rectangle([(0, 0), (self.oled.width, self.oled.height / 2)], fill=0)
        self.update_display()


keg = KegDataAccess.get_most_recent_active_keg()
base_oled = OledBeerDisplay(KegDataAccess.get_beer_name(keg.beer_id))
volume_at_last_display_refresh = keg.current_volume
volume_change_for_display_refresh_threshold = 0.010
has_significant_volume_recently_poured = False

init_logging()
logger = logging.getLogger(__name__)


def log_keg_status():
    logger.debug("Keg {}. \n\tLast active: {}\n\tVolume at last display refresh: {}".format(
        'active' if is_active else 'inactive',
        keg.last_updated_timestamp.isoformat("T"),
        volume_at_last_display_refresh))


def repaint_and_update_display():
    base_oled.clear_beers_remaining()
    base_oled.clear_liters_remaining()
    base_oled.draw_beers_remaining(get_whole_pint_count(keg.current_volume))
    base_oled.draw_liters_remaining(keg.current_volume)
    base_oled.update_display()


logger.info("Starting main loop")
while True:
    try:
        keg = KegDataAccess.get_most_recent_active_keg()
        keg_has_been_updated_recently = keg.last_updated_timestamp + timedelta(minutes=45) > datetime.now(timezone.utc)
        significant_volume_has_poured = (keg.current_volume + volume_change_for_display_refresh_threshold) < \
                                        volume_at_last_display_refresh

        if not keg_has_been_updated_recently:
            has_significant_volume_recently_poured = False

        if keg_has_been_updated_recently and (significant_volume_has_poured or has_significant_volume_recently_poured):
            is_active = True
            repaint_and_update_display()
            volume_at_last_display_refresh = keg.current_volume
            has_significant_volume_recently_poured = True

            # Go crazy with the updates during times of use for quickest display updates possible
            time.sleep(.1)
        else:
            is_active = False
            base_oled.clear_display()

            # Sleep longer if not in use
            time.sleep(.5)

        log_keg_status()
    except KeyboardInterrupt:
        logger.info("\nExiting")
        sys.exit()
