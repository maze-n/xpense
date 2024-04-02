FROM node:18-alpine

RUN mkdir -p /server
WORKDIR /server

COPY ../package.json /server/
COPY ../yarn.lock /server/

RUN npm install

COPY ../server/ /server/

CMD ["npm", "run", "backend"]
