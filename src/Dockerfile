FROM node:18-alpine
RUN npm install -g http-server

RUN mkdir -p /client
RUN mkdir -p /client/src
WORKDIR /client

COPY ../package.json /client/
COPY ../yarn.lock /client/

RUN npm install

COPY ../src/ /client/src
COPY ../public /client/
COPY ../index.html ../jsconfig.json ../vite.config.mjs ../.env /client/

RUN npm run build

CMD [ "http-server", "dist" ]
EXPOSE 3000:8080
