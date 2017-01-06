#!/bin/bash

echo 'Checking for nodejs'

if ! node_loc="$(type -p "node")" || [ -z "$node_loc" ]; then
  echo 'nodejs is not installed... installing.'
  curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
  sudo apt-get install -y nodejs build-essential
fi

echo 'Installing beerweb backend API'
cd ./server
npm install
cd ..

echo 'Installing beerweb frontend'
cd ./ui
npm install
cd ..

echo 'Installing http-server'
sudo npm install http-server -g
