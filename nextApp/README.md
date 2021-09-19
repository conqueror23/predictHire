## Project structure 

This is nextjs project embedded with front-end uis and route apis as the BFF of the whole project

The Front-end integrated apollo-client 
The back-end integrated apollo-server to handling requests to other microservices

# features included

1. user login check (used locaStorage to implement a bettter practice could be using JWT and an independent authentication services)

2. graqphql loading data from microservices. 

3. used Material-ui dashboard and signin template 

# could be improved

1. used material-ui templates can be improved with customized components later for better performance.



# config link to microservers

port:3001 company service

port:3002 user service

port:3003 vacant service

# dev script 

npm run dev
