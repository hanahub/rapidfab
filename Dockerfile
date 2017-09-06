FROM authentise/node-base:1
MAINTAINER Eli Ribble <eli@authentise.com>
ADD *.eot *.svg *.woff2 *.ttf favicon.ico gulpfile.js index.html karma.conf.js package.json rapidfab/** tests/** webpack.config.js webpack.production.config.js yarn.lock /src/
WORKDIR /src
RUN npm install && npm prune && npm run build:clean
RUN cp -R /src/node_modules /node_modules
