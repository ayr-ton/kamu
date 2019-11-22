prod:
	python manage.py migrate
	python manage.py collectstatic --noinput

docker-build:
	docker-compose build

docker-pull:
	docker pull ayrton/kamu

docker-migrate:
	docker-compose run --rm web python manage.py migrate

docker-createsuperuser:
	docker-compose run --rm web python manage.py createsuperuser

docker-loaddata:
	docker-compose run --rm web python manage.py loaddata dump_data/*.json

docker-dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up dev

docker-heroku:
	docker-compose up web

docker-down:
	docker-compose down

download-cc-test-reporter:
	mkdir -p tmp/
    curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./tmp/cc-test-reporter
    chmod +x ./tmp/cc-test-reporter

security-checks:
	sh ci/security-checks.sh

backend-deps:
	python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt

backend-tests:
	source venv/bin/activate
    DJANGO_SETTINGS_MODULE=kamu.settings.test coverage run manage.py test \
    coverage xml
    ./tmp/cc-test-reporter format-coverage -t coverage.py \
	-o tmp/codeclimate.backend.json coverage.xml

frontend-lint:
	npm run lint

frontend-tests:
	npm test
	./tmp/cc-test-reporter format-coverage -t lcov -o tmp/codeclimate.frontend.json coverage/lcov.info

upload-coverage:
	./tmp/cc-test-reporter sum-coverage tmp/codeclimate.*.json -p 2 -o tmp/codeclimate.total.json
    ./tmp/cc-test-reporter upload-coverage -i tmp/codeclimate.total.json

test: backend-tests frontend-tests
