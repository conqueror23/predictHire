# predictHire

##Thoughts:
1. sinces all three layres are combined in a same repo and not really huge, we might potentially use docker-compose to create envs for all three and treated it as a big project.


## Project structure

Front-end NextJs: for reveal front end UIs, could be simple info display for this test (cross-browser and cross-devices may not designedand implemented) [nextjs,reactjs,typescript,jest]

BFF: services to gather request from front-end and to sent to different services [nodejs,typescript,jest]

Back-end services:
    login service for users
    check company info services
    check vacant info services
    [nodejs,typescript,jest,mongodb,redis?]

