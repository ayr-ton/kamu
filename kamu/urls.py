import os

import django_saml2_auth.views
from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView, RedirectView
from rest_framework_nested import routers

from books import views
from waitlist.views import WaitlistViewSet

router = routers.DefaultRouter()

router.register(r'libraries', views.LibraryViewSet)
router.register(r'copies', views.BookCopyViewSet)

library_routers = routers.NestedSimpleRouter(router, r'libraries', lookup='library')
library_routers.register(r'books', views.BookViewSet, base_name='books')

book_routers = routers.NestedSimpleRouter(library_routers, r'books', lookup='book')
book_routers.register(r'waitlist', WaitlistViewSet, base_name='waitlist')

if os.environ.get("OKTA_METADATA_URL") is None:
    login_routes = [ url(r'^accounts/login', admin.site.login) ]
else:
    login_routes = [
        url(r'^accounts/login', django_saml2_auth.views.signin),
        url(r'^admin/login/$', django_saml2_auth.views.signin),
        url(r'^okta-login/', include('django_saml2_auth.urls')),
    ]

urlpatterns = login_routes + [
    url(r'^admin$', RedirectView.as_view(url = '/admin/')),
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^api/', include(library_routers.urls)),
    url(r'^api/', include(book_routers.urls)),
    url(r'^api/profile/?$', views.UserView.as_view()),
    url(r'^api/profile/books', views.UserBooksView.as_view()),
    url(r'^favicon\.ico$', RedirectView.as_view(url=settings.STATIC_URL + 'images/favicon.ico')),
    url(r'', login_required(views.FrontendView.as_view())),
]
