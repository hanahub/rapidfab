FROM authentise/node-base:1
MAINTAINER Eli Ribble <eli@authentise.com>
ADD . /src
WORKDIR /src
RUN npm install && npm prune && npm run build:clean
