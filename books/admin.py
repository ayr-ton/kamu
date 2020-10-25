from django.contrib import admin
from django.urls import path

from books import views
from .models import *
from import_export import resources
from import_export.admin import ExportMixin
from import_export import fields


class BookCopyResource(resources.ModelResource):
    title = fields.Field(
        attribute='book__title',
        column_name='Title'
    )
    publisher = fields.Field(
        attribute='book__publisher',
        column_name='Publisher'
    )
    isbn = fields.Field(
        attribute='book__isbn',
        column_name='ISBN'
    )
    publication_date = fields.Field(
        attribute='book__publication_date',
        column_name='Publication date'
    )
    username = fields.Field(
        attribute='user__username',
        column_name='User'
    )
    user_email = fields.Field(
        attribute='user__email',
        column_name='Email'
    )
    borrow_date = fields.Field(
        attribute='borrow_date',
        column_name='Borrow date'
    )
    library = fields.Field(
        attribute='library__slug',
        column_name='Library'
    )

    class Meta:
        model = BookCopy
        exclude = ('id', 'book', 'user')
        export_order = ('title',
                        'publisher',
                        'isbn',
                        'publication_date',
                        'user_email',
                        'borrow_date',
                        'library'
                        )


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

    def get_urls(self):
        urls = super().get_urls()

        info = self.model._meta.app_label, self.model._meta.model_name

        my_urls = [
            path('isbn/', views.IsbnFormView.as_view(),  name='%s_%s_isbn' % info),
        ]

        return my_urls + urls


class BookCopyAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = BookCopyResource
    list_display = ['id', 'book', 'library', 'user']
    list_per_page = 20
    search_fields = ['book__title', 'user__username']
    autocomplete_fields = ['book', 'library', 'user']
    list_filter = ('library', )

    def add_view(self, request):
        return super(BookCopyAdmin, self).add_view(request)


admin.site.site_header = 'Kamu administration'
admin.site.site_title = 'Kamu administration'
admin.site.index_title = 'Kamu'
admin.site.register(Book, BookAdmin)
admin.site.register(Library, LibraryAdmin)
admin.site.register(BookCopy, BookCopyAdmin)
