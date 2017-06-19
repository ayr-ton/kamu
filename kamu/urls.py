import django_saml2_auth.views
from django.conf.urls import url, include
from django.conf import settings
from django.contrib import admin
from django.views.generic import TemplateView, RedirectView
from rest_framework import routers
from django.contrib.auth.decorators import login_required
from books import views
import os


router = routers.DefaultRouter()
router.register(r'libraries', views.LibraryViewSet)
router.register(r'copies', views.BookCopyViewSet)

urlpatterns = [ 
    url(r'^$', login_required(TemplateView.as_view(template_name='home.html'))),
    url(r'^libraries/(?P<slug>.+)/', login_required(TemplateView.as_view(template_name='libraries.html'))),
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^api/profile', views.UserView.as_view()),
    url(r'^api/copies/(?P<id>.+)/borrow', views.BookCopyBorrowView.as_view()),
    url(r'^api/copies/(?P<id>.+)/return', views.BookCopyReturnView.as_view()),
    url(r'^api/books/(?P<id>.+)/show', views.BookDetailView.as_view()),
    url(r'^favicon\.ico$', RedirectView.as_view(url=settings.STATIC_URL + 'images/favicon.ico'))
]

if os.environ.get("DISABLE_SAML2"):
    urlpatterns.append(url(r'^accounts/login', admin.site.login))
else:
    urlpatterns.append(url(r'^accounts/login', django_saml2_auth.views.signin))
    urlpatterns.append(url(r'^admin/login/$', django_saml2_auth.views.signin))
    urlpatterns.append(url(r'^okta-login/', include('django_saml2_auth.urls')))