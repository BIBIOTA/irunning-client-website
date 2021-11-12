FROM node:14-alpine as publish
WORKDIR /app
ARG VUE_APP_API_KEY
ENV VUE_APP_API_KEY=${VUE_APP_API_KEY}
RUN echo VUE_APP_API_KEY >> /app/.env
# RUN echo "VUE_APP_API_KEY=https://irunningapi.bibiota.com/api" >> /app/.env
RUN echo "VUE_APP_NODE_API_KEY=https://irunning-node.bibiota.com/api" >> /app/.env
RUN echo "VUE_APP_API_STORAGE=https://irunningapi.bibiota.com/storage" >> /app/.env
RUN echo "VUE_APP_STRAVA_CLIENT_ID=68055" >> /app/.env
RUN echo "VUE_APP_STRAVA_CLIENT_SECRET=4222100739f8aeecfe2bd2c2df077e5ec5a6b46c" >> /app/.env
RUN echo "VUE_APP_REDIRECT_URI=https://irunning.bibiota.com" >> /app/.env
RUN echo "BASE_URL=https://irunning.bibiota.com" >> /app/.env
RUN echo "VUE_APP_ENV=production" >> /app/.env
RUN echo "VUE_APP_GAPI=AIzaSyD_6zCWNrsF0BKAAhv0-bhcwYYw6TM5ZNQ" >> /app/.env
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


