
FROM node:10.13-alpine as base
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

FROM base as build
COPY package.json .
COPY yarn.lock .
RUN yarn install --production --frozen-lockfile


FROM base

ENV PORT=8080
ENV MQTT_URL='mqtt://localhost'
ENV MQTT_USERNAME=''
ENV MQTT_PASSWORD=''

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY app.js .

CMD node app.js