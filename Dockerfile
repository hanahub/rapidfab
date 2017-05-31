FROM node:7.10-alpine
MAINTAINER Eli Ribble <eli@authentise.com>
RUN apk add --no-cache curl
RUN apk add --no-cache fontconfig git python3 && \
  mkdir -p /usr/share && \
  cd /usr/share && \
  curl -L https://github.com/Overbryd/docker-phantomjs-alpine/releases/download/2.11/phantomjs-alpine-x86_64.tar.bz2 | tar xj && \
  ln -s /usr/share/phantomjs/phantomjs /usr/bin/phantomjs && \
  phantomjs --version
ADD . /src
RUN npm install
RUN rm /src/node_modules/karma-phantomjs2-launcher/node_modules/phantomjs2-ext/lib/phantom/bin/phantomjs
RUN ln -s /usr/bin/phantomjs /src/node_modules/karma-phantomjs2-launcher/node_modules/phantomjs2-ext/lib/phantom/bin/phantomjs
WORKDIR /src
