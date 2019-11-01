FROM gliderlabs/herokuish

COPY . /app

RUN /build

EXPOSE 8000

CMD ["/start", "web"]
