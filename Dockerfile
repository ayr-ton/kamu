FROM gliderlabs/herokuish

WORKDIR /app
COPY . /app

RUN /build

ENV PATH="/app/.heroku/node/bin:/app/.heroku/python/bin:${PATH}"
RUN npm install --only=dev

EXPOSE 8000

CMD ["/start", "web"]
