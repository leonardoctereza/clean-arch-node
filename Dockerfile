FROM node:16-alpine3.14 as base

WORKDIR /usr/src/app

COPY package.json .

RUN npm install --only=prod
