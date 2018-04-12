FROM authentise/container-rapidfab-base:latest
MAINTAINER Eli Ribble <eli@authentise.com>
ARG GITDESCRIBE=development
ARG COMMIT_HASH=abc123
ARG NODE_ENV=production
COPY nginx-static-config.conf /etc/nginx/sites-available/default
COPY .babelrc .eslintignore .eslintrc.js *.eot *.svg *.woff2 *.ttf index.html karma.conf.js nginx.crt nginx.key package.json webpack.config.js webpack.production.config.js yarn.lock /src/
COPY rapidfab /src/rapidfab
COPY tests /src/tests
COPY favicon.ico /src/dist/favicon.ico
WORKDIR /src
RUN npm run build
COPY config.js /src/dist/config.js
