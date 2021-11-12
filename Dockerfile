FROM node:14-alpine as publish
WORKDIR /app

ARG VUE_APP_API_KEY
ENV VUE_APP_API_KEY=${VUE_APP_API_KEY}
RUN echo VUE_APP_API_KEY >> /app/.env

ARG VUE_APP_NODE_API_KEY
ENV VUE_APP_NODE_API_KEY=${VUE_APP_NODE_API_KEY}
RUN echo VUE_APP_NODE_API_KEY >> /app/.env


ARG VUE_APP_API_STORAGE
ENV VUE_APP_API_STORAGE=${VUE_APP_API_STORAGE}
RUN echo VUE_APP_API_STORAGE >> /app/.env


ARG VUE_APP_STRAVA_CLIENT_ID
ENV VUE_APP_STRAVA_CLIENT_ID=${VUE_APP_STRAVA_CLIENT_ID}
RUN echo VUE_APP_STRAVA_CLIENT_ID >> /app/.env

ARG VUE_APP_STRAVA_CLIENT_SECRET
ENV VUE_APP_STRAVA_CLIENT_SECRET=${VUE_APP_STRAVA_CLIENT_SECRET}
RUN echo VUE_APP_STRAVA_CLIENT_SECRET >> /app/.env

ARG VUE_APP_REDIRECT_URI
ENV VUE_APP_REDIRECT_URI=${VUE_APP_REDIRECT_URI}
RUN echo VUE_APP_REDIRECT_URI >> /app/.env

ARG BASE_URL
ENV BASE_URL=${BASE_URL}
RUN echo BASE_URL >> /app/.env

ARG VUE_APP_ENV
ENV VUE_APP_ENV=${VUE_APP_ENV}
RUN echo VUE_APP_ENV >> /app/.env

ARG VUE_APP_GAPI
ENV VUE_APP_GAPI=${VUE_APP_GAPI}
RUN echo VUE_APP_GAPI >> /app/.env

COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean
COPY . .
RUN yarn
RUN yarn build
CMD [ "node" ]

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
#Copy nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
# Copy static assets from builder stage
COPY --from=publish /app/dist .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]


