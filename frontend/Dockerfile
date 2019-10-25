FROM node:alpine as development

WORKDIR /frontend

COPY ./yarn.lock ./
COPY ./package.json ./

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start"]

FROM nginx:latest as production

COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=development /frontend/build /frontend/build
