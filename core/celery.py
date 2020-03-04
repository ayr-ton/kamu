from __future__ import absolute_import, unicode_literals
from celery import Celery
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.dev')

app = Celery('kamu')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
