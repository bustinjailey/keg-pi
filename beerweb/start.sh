#!/bin/bash

cd ./server
npm start >> ../server.log 2>&1 &

cd ../ui/dist
http-server -p 8080 .  >> ../ui.log 2>&1 &

