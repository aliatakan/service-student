#!/bin/bash

# dockerize your app. Your dockerize project is http://localhost:8080
docker build -t your-name/service-student .
docker run -d -p 8080:3000 --name service-student your-name/service-student

# create a mount point for your docker container, put the data.json into that folder
# pull mongo docker image, run container, execute data.json. This will insert 7 documents into your mongoDB
mkdir ~/mongodb-mnt
cp data.json ~/mongodb-mnt
docker pull mongo
docker run -d -p 27017-27019:27017-27019 -v ~/mongodb-mnt:/mnt --name mongodb mongo
docker exec -it mongodb mongoimport --db mongo-exercise --collection students --drop --file /mnt/data.json --jsonArray
rm -R ~/mongodb-mnt

# install packages for your local usage
# your project is http://localhost:3000
npm install
node index.js