FROM node:18.2-alpine3.14 as base

WORKDIR /usr/src/app

COPY package.json .

RUN npm install --only=prod

COPY ./dist ./dist

EXPOSE 5000

CMD npm start