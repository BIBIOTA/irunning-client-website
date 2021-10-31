FROM node:14.13.1 as publish
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean
COPY . .
RUN echo VUE_APP_API_KEY=$VUE_APP_API_KEY > /app/.env
RUN echo VUE_APP_NODE_API_KEY=$VUE_APP_NODE_API_KEY > /app/.env
RUN echo VUE_APP_API_STORAGE=$VUE_APP_API_STORAGE > /app/.env
RUN echo VUE_APP_STRAVA_CLIENT_ID=$VUE_APP_STRAVA_CLIENT_ID > /app/.env
RUN echo VUE_APP_STRAVA_CLIENT_SECRET=$VUE_APP_STRAVA_CLIENT_SECRET > /app/.env
RUN echo VUE_APP_REDIRECT_URI=$VUE_APP_REDIRECT_URI > /app/.env
RUN echo BASE_URL=$BASE_URL > /app/.env
RUN echo $VUE_APP_ENV=$VUE_APP_ENV > /app/.env
RUN echo $VUE_APP_GAPI=$VUE_APP_GAPI > /app/.env
RUN yarn build
CMD [ "node" ]

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=publish /app/dist .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
