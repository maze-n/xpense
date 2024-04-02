FROM node:18-alpine

RUN mkdir -p /client
WORKDIR /client

COPY ./package.json /client/
COPY ./package-lock.json /client/

RUN npm install

COPY ./src /client/

CMD ["npm", "run", "dev"]
