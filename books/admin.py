from django import forms
from django.contrib import admin

from .models import *


class BookCopyInline(admin.TabularInline):
    model = BookCopy
    extra = 0
    max_num = 0
    show_change_link = True
    readonly_fields = ['book', 'user']


class LibraryAdmin(admin.ModelAdmin):
    inlines = [BookCopyInline]
    list_display = ['name']
    search_fields = ['name']


class BookAdmin(admin.ModelAdmin):
    inlines = [BookCopyInline]
    list_display = ['isbn', 'title', 'author']
    list_per_page = 20
    search_fields = ['title', 'author', 'isbn']


class BookCopyAdmin(admin.ModelAdmin):
    list_display = ['id', 'book', 'library', 'user']
    list_per_page = 20
    search_fields = ['book__title', 'user__username']
    autocomplete_fields = ['book', 'library', 'user']

    def add_view(self, request):
        return super(BookCopyAdmin, self).add_view(request)


admin.site.site_header = 'Kamu administration'
admin.site.site_title = 'Kamu administration'
admin.site.index_title = 'Kamu'
admin.site.register(Book, BookAdmin)
admin.site.register(Library, LibraryAdmin)
admin.site.register(BookCopy, BookCopyAdmin)
