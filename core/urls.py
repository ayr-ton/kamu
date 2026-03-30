import os

if os.environ.get("OKTA_METADATA_URL") is not None:
    import django_saml2_auth.views

from django.conf import settings
from django.urls import include, path, re_path
from django.contrib import admin
from django.views.generic import RedirectView

from books import views

if os.environ.get("OKTA_METADATA_URL") is None:
    login_routes = [re_path(r'^accounts/login', admin.site.login)]
else:
    login_routes = [
        re_path(r'^okta-login/', include('django_saml2_auth.urls')),
        re_path(r'^accounts/login/$', django_saml2_auth.views.signin),
        path('admin/login/', django_saml2_auth.views.signin),
    ]

urlpatterns = login_routes + [
    path('admin', RedirectView.as_view(url='/admin/')),
    re_path(r'^admin/', admin.site.urls),
    re_path(r'^favicon\.ico$', RedirectView.as_view(url=settings.STATIC_URL + 'images/favicon.ico')),
    path('', views.library_list, name='library-list'),
    path('libraries/<slug:slug>/', include('books.urls')),
    path('my-books/', views.my_books, name='my-books'),
]
