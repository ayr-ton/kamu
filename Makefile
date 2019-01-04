prod:
	python manage.py migrate
	python manage.py collectstatic --noinput

dev:
	npm run-script start

sync-upstream:
	@git fetch upstream
	@git rebase upstream/master
