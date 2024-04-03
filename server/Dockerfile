FROM node:18-alpine

RUN mkdir -p /app
RUN mkdir -p /app/server
WORKDIR /app

COPY ../package.json /app/
COPY ../yarn.lock /app/

RUN npm install

COPY ../server/ /app/server/

CMD ["npm", "run", "backend:prod"]
EXPOSE 8000:8000
