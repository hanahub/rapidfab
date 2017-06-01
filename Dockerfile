FROM node:7.10
MAINTAINER Eli Ribble <eli@authentise.com>
RUN apt-get update
RUN apt-get install -y git python3
ADD . /src
WORKDIR /src
