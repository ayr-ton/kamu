FROM ubuntu:bionic
RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y xmlsec1 \
                    python3 python3-pip curl wget
WORKDIR /app
COPY .. $WORKDIR
RUN ln -s /usr/bin/python3 /usr/bin/python
ENV VERSION=v10.15.0
ENV DISTRO=linux-x64
RUN wget https://nodejs.org/dist/v10.15.0/node-v10.15.0-linux-x64.tar.xz
RUN mkdir /usr/local/lib/nodejs
RUN tar -xJvf node-$VERSION-$DISTRO.tar.xz -C /usr/local/lib/nodejs
RUN mv /usr/local/lib/nodejs/node-$VERSION-$DISTRO /usr/local/lib/nodejs/node-$VERSION
ENV NODEJS_HOME=/usr/local/lib/nodejs/node-$VERSION/bin
ENV PATH=$NODEJS_HOME:$PATH

RUN curl -L https://www.npmjs.com/install.sh | sh
RUN npm install
RUN pip3 install -r requirements.txt

EXPOSE 8000
EXPOSE 3000
#ENTRYPOINT ./entrypoint.sh
CMD ["npm","run-script","start"]

