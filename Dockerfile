FROM ubuntu:bionic
RUN DEBIAN_FRONTEND=noninteractive apt-get update && apt-get install -y xmlsec1 \
                    python3 python3-pip curl nodejs
WORKDIR /app
COPY . $WORKDIR
RUN ln -s /usr/bin/python3 /usr/bin/python
RUN curl -L https://www.npmjs.com/install.sh | sh
RUN npm install webpack
RUN npm install packages
RUN pip3 install -r requirements.txt

EXPOSE 8000
EXPOSE 3000
CMD ["npm","run-script","start"]

