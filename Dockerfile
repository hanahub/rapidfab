FROM authentise/node-base:2
MAINTAINER Eli Ribble <eli@authentise.com>
COPY .babelrc .eslintignore .eslintrc.js *.eot .git *.svg *.woff2 *.ttf favicon.ico gulpfile.js index.html karma.conf.js nginx.crt nginx.key package.json webpack.config.js webpack.production.config.js yarn.lock /src/
COPY rapidfab /src/rapidfab
COPY tests /src/tests
WORKDIR /src
RUN npm install && npm prune
RUN npm run build
