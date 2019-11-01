FROM gliderlabs/herokuish

WORKDIR /app
COPY . /app

RUN /build

EXPOSE 8000

CMD ["/start", "web"]
