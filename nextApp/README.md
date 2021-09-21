## Project structure

This is nextjs project embedded with front-end uis and route apis as the BFF of the whole project

The Front-end integrated apollo-client
The back-end integrated apollo-server to handling requests to other microservices (BFF)

## BFF features included

1. user login check ( creating JWT and using that token to access other services)

2. graqphql loading data from microservices.

## could be improved

1. used material-ui templates can be improved with customized components later for better performance.

2. used Material-ui dashboard and signin template (removed time may not sufficient)

## config link to microservers

port:3001 company service

port:3002 user service

port:3003 vacant service

## dev script

npm install && npm run dev



## use case 

graphql entryPoint : http://localhost:3000/api/graphql

### Queries :

#### compay querys :

query{
	Companys{
    _id
    name
    address
  }
}

#### Users query:

query{
  Users{
    name
    _id
    companyId
    username
  }
}

#### Vacant querys:

query{
  Vacants{
    _id
    title
    description
    companyId
    expiredAt
  
  }
}


### mutations:

use cases: 
#### login  mutaion:

mutation{
  login(loginInput:{
		username:"mark",
    password:"mark"
  }){
    status
    message
  }
}

#### createVacant (need login token from  login process)

mutation{
  createVacant(vacantInput:{
    companyId:"61486a985bdfdd2d47d0f0144",
    title:"sn dev-13",
    description:" no just for fun ",
    expiredAt:"2012-23-23",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hcmsiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzIxNDU0MzEsImV4cCI6MTYzMjIzMTgzMX0.TMqPq-r1uERcimpnu1UG2vFrJN3t0p09msd1NIP42i0"
  }){
		status
    message
  }
}
    
#### updateVacant 

mutation{
  updateVacant(vacantInput:{
    _id:"61492d971c20523942808179",
    title:"changed sn dev=1",
    description:"fwerwer",
    companyId:"5e5df7fc6953acd3dc50fe8f",
    expiredAt:"changed-dated",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hcmsiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzIxODc0NDYsImV4cCI6MTYzMjI3Mzg0Nn0.d9bT-bYkpLavd52p0wh42mWyy_1hxF1FlIDkprPtb8c"
  }){
  status
    message
  }
}

#### deleteVacant

mutation{
  deleteVacant(vacantInput:{
    _id:"61492d971c20523942808176",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hcmsiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzIyMDI4MjcsImV4cCI6MTYzMjI4OTIyN30.JBznuIXONGT181HjLX6QrsLLc3omia7_AceBI8GLohU",
    title:"sn"
  }){
   	status
    message
  }
}