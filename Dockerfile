# STAGE 1
FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN rm -f config.json

# STAGE 2, por seguridad.
FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=0 /usr/src/app/ ./

RUN npm install pm2@4.4.0 -g

EXPOSE 80

CMD pm2-runtime app.js
