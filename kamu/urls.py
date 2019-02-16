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

urlpatterns = [
    url(r'^$', login_required(TemplateView.as_view(template_name='home.html'))),
    url(r'^spa$', login_required(TemplateView.as_view(template_name='spa.html'))),
    url(r'^libraries/(?P<slug>.+)/', login_required(TemplateView.as_view(template_name='libraries.html'))),
    url(r'^my-books', login_required(TemplateView.as_view(template_name='mybooks.html'))),
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^api/', include(library_routers.urls)),
    url(r'^api/', include(book_routers.urls)),
    url(r'^api/profile/?$', views.UserView.as_view()),
    url(r'^api/profile/books', views.UserBooksView.as_view()),
    url(r'^api/copies/(?P<id>.+)/borrow', views.BookCopyBorrowView.as_view()),
    url(r'^api/copies/(?P<id>.+)/return', views.BookCopyReturnView.as_view()),
    url(r'^favicon\.ico$', RedirectView.as_view(url=settings.STATIC_URL + 'images/favicon.ico'))
]

if os.environ.get("OKTA_METADATA_URL") is None:
    urlpatterns.append(url(r'^accounts/login', admin.site.login))
else:
    urlpatterns.append(url(r'^accounts/login', django_saml2_auth.views.signin))
    urlpatterns.append(url(r'^admin/login/$', django_saml2_auth.views.signin))
    urlpatterns.append(url(r'^okta-login/', include('django_saml2_auth.urls')))
