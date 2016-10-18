FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install --global bower --silent
RUN npm install --silent

RUN echo '{ "allow_root": true }' > /root/.bowerrc

RUN bower install

ENV PORT=9000

EXPOSE 9000
EXPOSE 9091

CMD ["npm", "start"]

