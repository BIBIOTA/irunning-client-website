FROM node:14.13.1
WORKDIR /usr/src/app
RUN yarn global add http-server
COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean
COPY . .
RUN yarn build
EXPOSE 80
CMD [ "http-server", "dist" ]

