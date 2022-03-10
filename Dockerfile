FROM node:16-alpine as publish
WORKDIR /app


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


