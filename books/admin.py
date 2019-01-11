from django.contrib import admin
from django.urls import path

from books import views
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


class WishListInline(admin.TabularInline):
    model = WishList
    extra = 0
    max_num = 0
    can_delete = False
    readonly_fields = ['book', 'user', 'library', 'state']


class BookAdmin(admin.ModelAdmin):
    inlines = [BookCopyInline, WishListInline]
    list_display = ['isbn', 'title', 'author']
    list_per_page = 20
    search_fields = ['title', 'author', 'isbn']

    def get_urls(self):
        urls = super().get_urls()

        info = self.model._meta.app_label, self.model._meta.model_name

        my_urls = [
            path('isbn/', views.IsbnFormView.as_view(), name='%s_%s_isbn' % info),
        ]

        return my_urls + urls


class BookCopyAdmin(admin.ModelAdmin):
    list_display = ['id', 'book', 'library', 'user']
    list_per_page = 20
    search_fields = ['book__title', 'user__username']
    autocomplete_fields = ['book', 'library', 'user']

    def add_view(self, request):
        return super(BookCopyAdmin, self).add_view(request)

      
class WishListAdmin(admin.ModelAdmin):
    list_display = ['book', 'user', 'library', 'state']
    autocomplete_fields = ['book', 'library', 'user']
    search_fields = ['book__title', 'user__username', 'state']
    list_per_page = 20


admin.site.site_header = 'Kamu administration'
admin.site.site_title = 'Kamu administration'
admin.site.index_title = 'Kamu'
admin.site.register(Book, BookAdmin)
admin.site.register(Library, LibraryAdmin)
admin.site.register(BookCopy, BookCopyAdmin)
admin.site.register(WishList, WishListAdmin)
