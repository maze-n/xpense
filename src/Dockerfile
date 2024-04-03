FROM node:18-alpine
RUN npm install -g http-server

RUN mkdir -p /client
RUN mkdir -p /client/src
WORKDIR /client

COPY ../package.json /client/

RUN yarn

COPY ../src/ /client/src
COPY ../public /client/
COPY ../index.html ../jsconfig.json ../vite.config.mjs ../.env /client/

CMD [ "yarn", "dev" ]
EXPOSE 3000
