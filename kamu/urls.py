from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework import routers
from django.contrib.auth.decorators import login_required
import django_saml2_auth.views
from books import views


router = routers.DefaultRouter()
router.register(r'books', views.BookViewSet)
router.register(r'libraries', views.LibraryViewSet)

urlpatterns = [
    url(r'^$', login_required(TemplateView.as_view(template_name='home.html'))),
    url(r'^libraries/(?P<slug>.+)/', login_required(TemplateView.as_view(template_name='libraries.html'))),
    url(r'^accounts/login', django_saml2_auth.views.signin),
    url(r'^okta-login/', include('django_saml2_auth.urls')),
    url(r'^admin/login/$', django_saml2_auth.views.signin),
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^api/profile', views.UserView.as_view()),
]
