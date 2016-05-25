# Keg Pi (Raspbeery Pi)

## About
Keg Pi is a set of python packages that show you how much beer is left in your kegerator.  There are 3 packages that work together to do this: volumetracker, beerstats, and beerweb.  They all share a PostgreSQL instance that is used to track the keg state over time.

Watch it in action:

[![Video of Keg Pi in action](https://img.youtube.com/vi/SBuiSrTC2JU/0.jpg)](https://www.youtube.com/watch?v=SBuiSrTC2JU)

## Modules 
### volumetracker
Keeps track of the beer you drink as you pour it.  It reads the pour rate from a flow meter attached to the Raspberry Pi and logs the keg's remaining volume to the database.

### beerstats
Uses the data stored by volumetracker to give you a readout of approximately how much beer is left in your keg
 
### beerweb (coming soon)
A small web application to manage current and past kegs.  This is where you can create new kegs and set the beer name to be shown on the display.
   
## Hardware
### Raspberry Pi
Keg Pi was tested on a Raspberry Pi 2 model B running Raspbian Jessie but theoretically should run on pretty much any Raspberry Pi.

### Screen
Keg Pi was written to display stats on a 128x64 pixel SSD1306 OLED display.  [This was the one used in the Youtube link above](http://www.amazon.com/Diymall-Serial-128x64-Display-Arduino/dp/B00O2KDQBE/ref=pd_sim_147_2?ie=UTF8&dpID=51GAF1wgseL&dpSrc=sims&preST=_AC_UL160_SR160%2C160_&refRID=0ZQ1QTC52PPGAVBRC4Z0), however anything that can use the SSD1306 driver and can be connected to the Raspberry Pi via I2C should work.

### Flow Meter
Keg Pi deducts from the total keg quantity based on the output of a flow meter attached to the Raspberry Pi's GPIO pins.  [This was the flow meter used in the Youtube video](http://www.amazon.com/Liquid-Flow-Meter--Plastic-Threaded/dp/B00K0TFZN8/ref=sr_1_cc_1?s=aps&ie=UTF8&qid=1464151428&sr=1-1-catcorr&keywords=flow+meter+adafruit)

## Installation
1. Attach the flow meter and OLED display.  By default the application expects:
    1. An SSD1306 128x64 pixel display connected via I2C
    2. A flow meter connected via GPIO pin number 23
2. Enable the I2C kernel module
    1. Run `sudo raspi-config`
    2. Choose Advanced Options, go to I2C and choose Yes at the two prompts
    3. Reboot
3. Create a directory under the home directory to hold the packages and cd to it
    - `mkdir ~/git && cd ~/git`
4. Clone keg-pi repo
    - `git clone http://192.168.8.12:3000/bustinjailey/keg-pi.git` TODO: Replace URL
5. Run `cd keg-pi && sudo install.sh` and enter a password to be used for the database user when prompted.  The default is `raspberry` if you don't care to set your own password.  It is designed to be run on a fresh Raspbian installation and does a few things
    1. Installs PostgreSQL
    2. Creates the keg-pi database schema
    3. Installs various package dependencies
    4. Installs the modules as daemons using `supervisor`
