FROM gliderlabs/herokuish:v0.5.4

WORKDIR /app
COPY . /app

RUN /build

ENV PATH="/app/.heroku/node/bin:/app/.heroku/python/bin:${PATH}:/app/vendor/xmlsec1/bin"
ENV LD_LIBRARY_PATH="${LD_LIBRARY_PATH}:vendor/xmlsec1/lib"

RUN npm install --only=dev

EXPOSE 8000

CMD ["/start", "web"]
