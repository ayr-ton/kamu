from django import forms
from django.contrib import admin

from .models import *


class BookCopyModelForm(forms.ModelForm):
    class Meta:
        fields = ['book', 'library', 'user', 'borrow_date']
        model = BookCopy
        widgets = {
            'book': autocomplete.ModelSelect2(
                url='book-autocomplete',
                attrs={
                    # Set some placeholder
                    'data-placeholder': 'Book title',
                    # Only trigger autocompletion after 3 characters have been typed
                    'data-allow-clear': "true",
                    'data-minimum-input-length': 3,
                    'data-width': 400
                }
            )
        }


class BookCopyInline(admin.TabularInline):
    model = BookCopy
    extra = 0
    max_num = 0
    show_change_link = True
    readonly_fields = ['book', 'user']


class LibraryAdmin(admin.ModelAdmin):
    inlines = [BookCopyInline]
    list_display = ['name']


class BookAdmin(admin.ModelAdmin):
    inlines = [BookCopyInline]
    list_display = ['title', 'author']
    list_per_page = 20
    search_fields = ['title', 'author']


class BookCopyAdmin(admin.ModelAdmin):
    list_display = ['id', 'library', 'book', 'user']
    list_per_page = 20
    search_fields = ['book__title', 'user__username']
    form = BookCopyModelForm


admin.site.site_header = 'Kamu administration'
admin.site.site_title = 'Kamu administration'
admin.site.index_title = 'Kamu'
admin.site.register(Book, BookAdmin)
admin.site.register(Library, LibraryAdmin)
admin.site.register(BookCopy, BookCopyAdmin)
