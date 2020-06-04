FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install pm2@4.4.0 -g

RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 80

CMD pm2-runtime app.js
