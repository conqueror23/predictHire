# predictHire

## commands to run

essential requirements: node , docker, docker-compose 
project has been integrated and a simple npm start command can start all three services (user port: 3001, company: 3002 : vacant : 3003) and the nextjs BFF in port 3000

npm run start


## Thoughts:
1. for simplicity purpose all three services are combined in one repo it can be seperated to individual repos in real daily use, we might potentially use docker-compose to create envs for all three and treated it as a big project.
2. Do we need to seperate BFF layer out fron front-end or if we could use then in the same nextjs project ? Since Nextjs provid a API routes setup we could pontential use it as a BFF for this project
3. seperate services, currently thoughts if based on the services requests which are : company service, vacant service and users service. As for traditional microservices these services are indenpendent and are complelete isolated. This this how this will be implemented as well. Three dbs are going to created and each of them will have a collection for that service. There could be some potential to make them in one db and multiple collections as well. The Real usage and designs may depends on business requirements. But such changes can be managed in simple env change.
4. These three services are independent but there are some inner connection between them. multiple vacant are linked to one company, multiple users belongs to a company, one user may have multiple vacant ?
5. how many dbs do we need ? It can be assigned three dbs to achiev each independent services, and each of them are all dependent but use one db is also  achievable.

## Project structure

Nextjs:
    BFF: services to gather request from front-end and to sent to different services [nextjs,nodejs,typescript,jest]

Back-end services:

    login service for users
    
    check company info services
    
    check vacant info services
    
    [nodejs,typescript,jest,mongodb,redis?]


## Requirement breakdowns:

### backend-for front-end :

1. user login info check
2. vacancies info check and controls 

-- graphql server localhost:3000/graphql


### microservices:
1. company info controls
2. user info controls
3. vacancie info controls
