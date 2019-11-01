FROM gliderlabs/herokuish

WORKDIR /app
COPY . /app

RUN /build

ENV PATH=".heroku/node/bin/:.heroku/python/bin:${PATH}"

EXPOSE 8000

CMD ["/start", "web"]
