FROM node:12.13-alpine as development

ARG APP_DIR=/usr/src/backend-node
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY . /usr/src/backend-node
COPY package.json $APP_DIR
COPY yarn.lock $APP_DIR

RUN yarn
COPY . $APP_DIR

CMD ["yarn", "start:dev"]


FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/backend-node

COPY package*.json ./

RUN yarn --only=production

COPY . .

COPY --from=development /usr/src/backend-node/dist ./dist

CMD ["node", "dist/main"]