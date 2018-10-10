FROM node:10.8.0

RUN wget https://www.python.org/ftp/python/3.6.3/Python-3.6.3.tar.xz && \
    tar xJf Python-3.6.3.tar.xz && \
    cd Python-3.6.3 && \
    ./configure && \
    make && \
    make install

COPY . /home/node/kamu
WORKDIR /home/node/kamu

RUN python3 -m venv kamu &&  \
    cp /usr/local/bin/python3.6 /usr/local/bin/python && \
    chmod +x kamu/bin/activate && \
    /bin/bash -c "source kamu/bin/activate" && \
    pip3.6 install -r requirements.txt && \
    npm install package.json && \
    python manage.py migrate && \
    python manage.py loaddata dump_data/*.json

EXPOSE 8000

CMD [ "npm", "start" ]