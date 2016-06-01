#!/usr/bin/env bash
# Reinstalls the keg-pi applications but does not touch core dependencies, the database, or the secrets.py file
set -e
INSTALL_DIR=${PWD}
export KEG_PI_ROOT=${INSTALL_DIR}

ADAFRUIT_PYTHON_GPIO_REPO_NAME="Adafruit_Python_GPIO"

if [[ ! -d "../${ADAFRUIT_PYTHON_GPIO_REPO_NAME}" ]]; then
    echo "--> Installing ${ADAFRUIT_PYTHON_GPIO_REPO_NAME}"
    cd ..
    git clone https://github.com/adafruit/Adafruit_Python_GPIO.git
    cd ./Adafruit_Python_GPIO
    python3 setup.py install
fi

echo "--> Setting up daemons for beerstats and volumetracker"
cd ${INSTALL_DIR}
ln -sf "${INSTALL_DIR}/beerstats/beerstatsd.conf" /etc/supervisor/conf.d/beerstatsd.conf
ln -sf "${INSTALL_DIR}/volumetracker/volumetrackerd.conf" /etc/supervisor/conf.d/volumetrackerd.conf

mkdir -p /var/log/beerstatsd
mkdir -p /var/log/volumetrackerd

supervisorctl update
supervisorctl restart beerstatsd
supervisorctl restart volumetrackerd

echo "--> Done"
