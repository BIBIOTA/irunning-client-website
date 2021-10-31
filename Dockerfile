FROM node:14-alpine as publish
WORKDIR /app
RUN echo "VUE_APP_API_KEY=https://irunningapi.bibiota.com/api" >> /app/.env
RUN echo "VUE_APP_NODE_API_KEY=https://irunning-node.bibiota.com/api" >> /app/.env
RUN echo "VUE_APP_API_STORAGE=https://irunningapi.bibiota.com/storage" >> /app/.env
RUN echo "VUE_APP_STRAVA_CLIENT_ID=68055" >> /app/.env
RUN echo "VUE_APP_STRAVA_CLIENT_SECRET=4222100739f8aeecfe2bd2c2df077e5ec5a6b46c" >> /app/.env
RUN echo "VUE_APP_REDIRECT_URI=https://irunning.bibiota.com" >> /app/.env
RUN echo "BASE_URL=https://irunning.bibiota.com" >> /app/.env
RUN echo "VUE_APP_ENV=production" >> /app/.env
RUN echo "VUE_APP_GAPI=AIzaSyAvjRz8URcOWoCuRfPqY2sab-4q_a-jo78" >> /app/.env
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean
COPY . .
RUN yarn
RUN yarn build
FROM node:14-alpine
WORKDIR /app
COPY --from=publish /app/dist .
CMD [ "node", "server.js" ]


