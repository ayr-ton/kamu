FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN git config --global url."https://github.com/".insteadOf git@github.com:
RUN git config --global url."https://".insteadOf git://

RUN npm config set unsafe-perm true

RUN npm install --global bower --silent

RUN echo '{ "allow_root": true }' > /root/.bowerrc

RUN npm install

RUN bower install

ENV PORT=9000

EXPOSE 9000
EXPOSE 9091

CMD ["npm", "start"]

