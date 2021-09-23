#!/bin/bash

mongoimport --host localhost --port 27017 --username root --password root --authenticationDatabase admin --db predictiveHire-company  --collection company --type json --file /mockup/company.json --jsonArray 
mongoimport --host localhost --port 27017 --username root --password root --authenticationDatabase admin --db predictiveHire-user  --collection user --type json --file /mockup/user.json --jsonArray 