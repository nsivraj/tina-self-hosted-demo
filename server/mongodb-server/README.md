# MongoDB database server for TinaCMS

## How to setup MongoDB using Docker on your laptop

1. In your terminal cd tina-self-hosted/server/mongodb-server
2. sudo docker ps -a
3. sudo docker images -a
4. sudo docker run --name office-mongo -d -p 27017:27017 -v ./config:/etc/mongo -v ./data:/data/db mongo --config /etc/mongo/mongod.conf

## How to setup MongoDB using Docker on AWS EC2 officesync instance

1. ssh officesync
2. docker ps -a
3. docker images -a
4. mkdir ~/office/mongo/config
5. mkdir ~/office/mongo/data
6. cp ./config/mongod.conf ~/office/mongo/config
7. docker run --name office-mongo -d -p 27017:27017 -v ~/office/mongo/config:/etc/mongo -v ~/office/mongo/data:/data/db mongo --config /etc/mongo/mongod.conf

## To get a dump of the data from mongo

1. Use mongodump: docker exec office-mongo sh -c 'exec mongodump -d tinacms_db --archive' > /some/path/on/your/host/all-collections.archive
