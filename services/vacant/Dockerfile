FROM node:lts
MAINTAINER bruce
RUN mkdir -p /src/app
WORKDIR /src/app
COPY .env /src/app/.env 
COPY package.json /src/app/package.json
RUN npm install 
COPY . /src/app
