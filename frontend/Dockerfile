FROM node:12-alpine as builder

WORKDIR /frontend

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install
COPY . .
RUN yarn build

FROM nginx:latest

WORKDIR /frontend

COPY --from=builder /frontend/build /frontend/build

RUN rm /etc/nginx/conf.d/*
COPY ./nginx/nginx.conf  /etc/nginx/conf.d/

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log
