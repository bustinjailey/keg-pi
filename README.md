# Keg Pi

## About
Keg Pi is a set of python packages that show how much beer is left in a keg.  There are 3 packages that work together to do this: volumetracker, beerstats, and beerweb.  They all share a PostgreSQL instance that is used to keep track of the keg over time.

Demo:

[![Video of Keg Pi in action](https://img.youtube.com/vi/RwvLITg1bXg/0.jpg)](https://www.youtube.com/watch?v=RwvLITg1bXg)

A few photos:
<div>
<a href="https://lh3.googleusercontent.com/jwsFJw96-5GbCwpelAvrdY0c-4yVS6sWCbtd_dmQ32JiZiAQ0czbrkCSpZDMrexRTl6HmwzO7cWPmVZ77LhIS2l_5dE6o_mS213dLrEE83luhvY1T1zRn-U5nzaSjO0-QMtU3hV1VQSiJbJJ1AUisE_50TL3iquxLcfm0RZdtFmrwaU3hXTotG03oi9-a9TRyUos3TFKaB_REhCyQkQqfCcNyTZKLEqM0pwAvONeYNaJwVBXn31lYuX2b9IwJFs6ZsgLxSQlcnCSncUzEqebLcxVp5SIVyrtHF9tZGNfM23Xtd3fj_2wKVCCpysZqR4mKt5B3YNh20EEppuzDjG4xlXExL_OvW9_1hoJca2jXyK1CqOvF9oNwtdrnoQNKlniX57IxmAevxDoGgUKIPcgcMsoy17rZv2AbfsK33nkSqIW20AEHcABeDMCpP2mhIuEEbrZUmf-yFo44MwKCiQHROz-DVMu4A6zWcqE84A_pUa4wOZObIHvyp3bO4D1ChyQBYo_jZtvbBWN9MiRjzkv0BngtixTuigW6g4N20qcu7BwJcdu14F1_GkT8edszl1pqS2RonhRXKKeot39fGD4t4Eobg=w1986-h1422-no"><img src="https://lh3.googleusercontent.com/jwsFJw96-5GbCwpelAvrdY0c-4yVS6sWCbtd_dmQ32JiZiAQ0czbrkCSpZDMrexRTl6HmwzO7cWPmVZ77LhIS2l_5dE6o_mS213dLrEE83luhvY1T1zRn-U5nzaSjO0-QMtU3hV1VQSiJbJJ1AUisE_50TL3iquxLcfm0RZdtFmrwaU3hXTotG03oi9-a9TRyUos3TFKaB_REhCyQkQqfCcNyTZKLEqM0pwAvONeYNaJwVBXn31lYuX2b9IwJFs6ZsgLxSQlcnCSncUzEqebLcxVp5SIVyrtHF9tZGNfM23Xtd3fj_2wKVCCpysZqR4mKt5B3YNh20EEppuzDjG4xlXExL_OvW9_1hoJca2jXyK1CqOvF9oNwtdrnoQNKlniX57IxmAevxDoGgUKIPcgcMsoy17rZv2AbfsK33nkSqIW20AEHcABeDMCpP2mhIuEEbrZUmf-yFo44MwKCiQHROz-DVMu4A6zWcqE84A_pUa4wOZObIHvyp3bO4D1ChyQBYo_jZtvbBWN9MiRjzkv0BngtixTuigW6g4N20qcu7BwJcdu14F1_GkT8edszl1pqS2RonhRXKKeot39fGD4t4Eobg=w1986-h1422-no" alt="Display" style="width: 400px;" width="400"/></a>
Keg Pi was developed in Los Angeles with Golden Road's Point the Way IPA!
</div><div><a href="https://lh3.googleusercontent.com/reWQxqUDwB3qGEezPP2_HRJalTNW1RyPGGTxNUOmQDJD96Sm6vjOSMA0-Tj2oOHYXDeBOb4XH_E5bGogdUb7rA4vKeokjssZuX2C20tt8jF4_6tQ4l-Zb1731Hl8PbCV2wC0pV15h9f3qqbupyQtLigQb0aduf-OG0KCMzl-8c2DDMXUws5QRAcJmuONvmMZufBI_1T3tqTjH1dYTQGtC2_ds6X1gAIOJBge80z3yMqRYd7vo9OanjUf-aqlPEexEooS6zJTJTV4zNnWXk0ijdJGWySk9YbO0d28O_5EAkcfcosvSkcDuZi2rEp4p8dccjKCwZHYJSyePBHMu3QricsfVtR6Z4FJrvNhodfLZ6XrY5TurcXnfVN4haArBs9U8sMblRmIao6pc5geuIZIF2z5LHprIlLDi5eaT25x-ly4Kxr73KsbQbKVrbjaaaIlZ4jGzWWI-pyBe3D1Kn7sAzruFrCCVc-r4gI9yMcL5mydMZOAwxM5jKvCfUrJdpNoW9koEsKQTl8L2HfpHc_7kkw5tXfL1JATxDYRsbcnja43Di2yCeP-qUu8VpoEZeTH560j4iJgemPtynUUor0o_n8lOA=w3008-h2006-no"><img src="https://lh3.googleusercontent.com/reWQxqUDwB3qGEezPP2_HRJalTNW1RyPGGTxNUOmQDJD96Sm6vjOSMA0-Tj2oOHYXDeBOb4XH_E5bGogdUb7rA4vKeokjssZuX2C20tt8jF4_6tQ4l-Zb1731Hl8PbCV2wC0pV15h9f3qqbupyQtLigQb0aduf-OG0KCMzl-8c2DDMXUws5QRAcJmuONvmMZufBI_1T3tqTjH1dYTQGtC2_ds6X1gAIOJBge80z3yMqRYd7vo9OanjUf-aqlPEexEooS6zJTJTV4zNnWXk0ijdJGWySk9YbO0d28O_5EAkcfcosvSkcDuZi2rEp4p8dccjKCwZHYJSyePBHMu3QricsfVtR6Z4FJrvNhodfLZ6XrY5TurcXnfVN4haArBs9U8sMblRmIao6pc5geuIZIF2z5LHprIlLDi5eaT25x-ly4Kxr73KsbQbKVrbjaaaIlZ4jGzWWI-pyBe3D1Kn7sAzruFrCCVc-r4gI9yMcL5mydMZOAwxM5jKvCfUrJdpNoW9koEsKQTl8L2HfpHc_7kkw5tXfL1JATxDYRsbcnja43Di2yCeP-qUu8VpoEZeTH560j4iJgemPtynUUor0o_n8lOA=w3008-h2006-no" alt="Flow meter" style="width: 400px;" width="400"/></a></div>



## Modules 
### volumetracker
Keeps track of how much beer is poured based on data from the flow meter.

### beerstats
Gives a readout of approximately how much beer is left in the keg.
 
### beerweb (coming soon)
Manages the kegs.  This is where the keg chaperone can create new kegs and choose the beer name to be displayed.
   
## Hardware
### Raspberry Pi
Keg Pi was tested on a Raspberry Pi 2 model B running Raspbian Jessie.  It should theoretically run on any Raspberry Pi.

### Flow Meter
Keg Pi subtracts from the total keg quantity based on the output from a [flow meter](http://www.amazon.com/Liquid-Flow-Meter--Plastic-Threaded/dp/B00K0TFZN8/ref=sr_1_cc_1?s=aps&ie=UTF8&qid=1464151428&sr=1-1-catcorr&keywords=flow+meter+adafruit) attached to the Raspberry Pi's GPIO pins.

### Screen
Keg Pi was written to display stats on a 128x64 pixel SSD1306 OLED display [like this](http://www.amazon.com/Diymall-Serial-128x64-Display-Arduino/dp/B00O2KDQBE/ref=pd_sim_147_2?ie=UTF8&dpID=51GAF1wgseL&dpSrc=sims&preST=_AC_UL160_SR160%2C160_&refRID=0ZQ1QTC52PPGAVBRC4Z0), however anything that can use the SSD1306 driver and can be connected to the Raspberry Pi via I2C should work.

## Installation
1. Format an SD card and flash the stock Raspbian (or Raspbian Lite) image by following [these instructions](https://www.raspberrypi.org/documentation/installation/installing-images/README.md).
2. Attach the flow meter and OLED display.  By default the application expects:
    1. An SSD1306 128x64 pixel display connected via I2C
    2. A flow meter connected via GPIO pin number 23
3. Enable the I2C kernel module
    1. Run `sudo raspi-config`
    2. Choose Advanced Options, go to I2C and choose Yes at the two prompts
    3. Reboot
4. Make sure you are in the pi user's home directory
    - `cd ~`
5. Clone keg-pi repo
    - `git clone https://github.com/bustinjailey/keg-pi.git`
6. Run `cd keg-pi && sudo install.sh` and enter a password to be used for the database user when prompted.  The default is `raspberry` if you don't care to set your own password.

The install script is designed to be run on a fresh Raspbian installation and does a few things:

1. Installs PostgreSQL
2. Creates the keg-pi database schema
3. Installs various package dependencies
4. Installs the modules as daemons using `supervisor`
