from django.contrib import admin
from . import models


admin.site.register(models.Book)
admin.site.register(models.Library)
