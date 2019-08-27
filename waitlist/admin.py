from django.contrib import admin
from waitlist.models import WaitlistItem

class WaitlistItemAdmin(admin.ModelAdmin):
    model = WaitlistItem
    list_display = ['id', 'book', 'library', 'user']
    search_fields = ['book__title', 'user__username']
    autocomplete_fields = ['book', 'library', 'user']

admin.site.register(WaitlistItem, WaitlistItemAdmin)
