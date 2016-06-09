import logging
import os
import sys

# Hack to include shared module dir in module search path
sys.path.append(os.path.realpath(os.path.join(os.path.dirname(os.path.realpath(__file__)), "..", "shared")))

import threading
import time
import RPi.GPIO as GPIO

from keg_dataaccess import KegDataAccess
from keg_logging import init_logging

VOLUME_PER_CLICK = 0.00225  # volume in liters
FLOW_METER_GPIO_PIN_NUMBER = 23
DATABASE_UPDATE_INTERVAL = .1  # in seconds

# A few variables to track when/if flow has occurred
last_click_time = time.time()
loop_last_click_time = last_click_time
last_log_time = 0
is_shutting_down = False
last_saved_volume = -1
keg = None

# Set up flow meter and callback function to handle flow meter clicks
GPIO.setmode(GPIO.BCM)
GPIO.setup(FLOW_METER_GPIO_PIN_NUMBER, GPIO.IN, pull_up_down=GPIO.PUD_UP)


def do_a_click(channel):
    """
    Callback which is invoked on every click of the flow meter
    """
    global last_click_time
    global keg

    if keg is None:
        return

    last_click_time = time.time()
    keg.pour(VOLUME_PER_CLICK)


GPIO.add_event_detect(FLOW_METER_GPIO_PIN_NUMBER, GPIO.RISING, callback=do_a_click, bouncetime=20)

init_logging()
logger = logging.getLogger(__name__)


def save_keg_current_volume_to_database():
    global keg
    global is_shutting_down
    global last_saved_volume

    if keg is None:
        return

    # Only make the update if something has changed
    if keg.current_volume < last_saved_volume:
        logger.debug("Saving keg volume to database: {0}".format(keg.current_volume))
        KegDataAccess.update_keg_current_volume(keg)
        last_saved_volume = keg.current_volume
    else:
        logger.debug("Volume unchanged")

    if not is_shutting_down:
        threading.Timer(DATABASE_UPDATE_INTERVAL, save_keg_current_volume_to_database).start()


# Start the database update timer by calling the method which updates and invokes itself after the set interval
save_keg_current_volume_to_database()

logger.info("Starting main loop")
while True:
    try:
        if keg is None:
            # On init or if a keg runs out this gets the (new) current keg if one exists
            keg = KegDataAccess.get_most_recent_active_keg()
            if keg is None:
                # If the keg is still null, sleep for a bit longer to save the CPU a bit
                logger.debug("Waiting for keg")
                time.sleep(60)
            else:
                logger.debug("Have a keg")
                last_saved_volume = keg.current_volume
                # Starts the timer to track the new keg volume
                save_keg_current_volume_to_database()

            time.sleep(1)
    except KeyboardInterrupt:
        logger.info("Exiting")
        is_shutting_down = True
        GPIO.cleanup()
        sys.exit()
