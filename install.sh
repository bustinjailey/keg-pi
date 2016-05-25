#!/usr/bin/env bash
set -e
INSTALL_DIR=${PWD}

echo "Enter database user password:"
read -s DB_PASSWORD
DB_PASSWORD=${DB_PASSWORD:-raspberry}
DB_USERNAME="postgres"

touch ./shared/secrets.py
echo "username = \"${DB_USERNAME}\"" >> ./shared/secrets.py
echo "password = \"${DB_PASSWORD}\"" >> ./shared/secrets.py

echo "--> Updating packages"
apt-get update

echo "--> Installing database"
apt-get -y install postgresql-9.1 postgresql-server-dev-9.1
sudo -u postgres psql -U postgres -d postgres -c "alter user ${DB_USERNAME} with password '${DB_PASSWORD}';"
service postgresql start

echo "--> Creating keg-pi schema"
sudo -u postgres psql -d postgres -a -f "./sql/create_schema.sql"
sudo -u postgres psql -d postgres -a -f "./sql/populate_lookups.sql"

echo "--> Installing OLED display dependencies"
apt-get -y install python3-dev python3-rpi.gpio python3-smbus python3-pip libjpeg-dev
PYTHON_VERSION=`python3 -c 'import sys; print("{}.{}".format(sys.version_info[0],sys.version_info[1]))'`

echo "using Python version $PYTHON_VERSION"

if type "pip${PYTHON_VERSION}" &> /dev/null; then
    PIP_EXECUTABLE="pip${PYTHON_VERSION}"
elif type "pip-${PYTHON_VERSION}" &> /dev/null; then
    PIP_EXECUTABLE="pip-${PYTHON_VERSION}"
fi

eval "${PIP_EXECUTABLE} install Pillow"
eval "${PIP_EXECUTABLE} install psycopg2"
eval "${PIP_EXECUTABLE} install pyyaml"

cd ..
git clone https://github.com/adafruit/Adafruit_Python_GPIO.git
cd ./Adafruit_Python_GPIO
python3 setup.py install

echo "--> Installing supervisor"
apt-get -y install supervisor

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
