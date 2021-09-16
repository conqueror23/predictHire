# predictHire

##Thoughts:
1. sinces all three layres are combined in a same repo and not really huge, we might potentially use docker-compose to create envs for all three and treated it as a big project.
2. Do we need to seperate BFF layer out fron front-end or if we could use then in the same nextjs project
3. seperate services, currently thoughts if based on the services requests which are : company info, vacant info and users info
4. These three services are independent but there are some inner connection between them. multiple vacant are linked to one company, multiple users belongs to a company, one user may have multiple vacant ?

## Project structure

Front-end NextJs: for reveal front end UIs, could be simple info display for this test (cross-browser and cross-devices may not designedand implemented) [nextjs,reactjs,typescript,jest]

BFF: services to gather request from front-end and to sent to different services [nodejs,typescript,jest]

Back-end services:
    login service for users
    check company info services
    check vacant info services
    [nodejs,typescript,jest,mongodb,redis?]

