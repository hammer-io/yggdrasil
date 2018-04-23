FROM node:carbon

# This was developed based on the guides at:
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
# https://medium.com/ai2-blog/dockerizing-a-react-application-3563688a2378

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

# Create app directory
WORKDIR /usr/app

# Install and configure `serve`.
RUN npm install -g serve
CMD serve -s build
EXPOSE 5000

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY index.html index.js ./
COPY ./favicons ./favicons
COPY ./src ./src
COPY ./style ./style
COPY .babelrc webpack.common.js webpack.prod.js ./
COPY ./config ./config

# Build for production.
RUN npm run build
