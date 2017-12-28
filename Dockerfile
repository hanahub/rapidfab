FROM authentise/node-base:2
MAINTAINER Eli Ribble <eli@authentise.com>
ADD nginx-static-config.conf /etc/nginx/sites-available/default
COPY .babelrc .eslintignore .eslintrc.js *.eot *.svg *.woff2 *.ttf favicon.ico index.html karma.conf.js nginx.crt nginx.key package.json webpack.config.js webpack.production.config.js yarn.lock /src/
COPY rapidfab /src/rapidfab
COPY tests /src/tests
WORKDIR /src
RUN npm install && npm prune
RUN GITDESCRIBE=$GITDESCRIBE COMMIT_HASH=$COMMIT_HASH npm run build
COPY config.js /src/dist/config.js
