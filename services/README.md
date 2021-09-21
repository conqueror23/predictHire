# predictiveHire microservices

# contains 

1. company service - used to provided serivces for company data manipulations port :3001
2. user service  -  used to provide services for user data manipulations port: 3002
3. vacant service - used to provide serivces for vacant data manipulations port: 3003
4. mongdb - database service for all services port:27018 (to avoid  conflict with potentail local mongodb)

* all services are containerised could be started by docker-compose 

# how to start services
 to start all services 
 jump to "/services" folder where the docker-compose.yml file is located runs required to have docker-compose tool 

 docker-compose up 
