FROM gliderlabs/herokuish

RUN mkdir -p /app
ADD . /app
RUN /build

EXPOSE 8000

CMD /start web
