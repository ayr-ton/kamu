from django.conf.urls import url, include
from rest_framework import routers
from books import views
from django.contrib import admin
from django.contrib.staticfiles.views import serve
import django_saml2_auth.views

router = routers.DefaultRouter()
router.register(r'books', views.BookViewSet)
router.register(r'libraries', views.LibraryViewSet)

urlpatterns = [
    url(r'^okta-login/', include('django_saml2_auth.urls')),
    url(r'^admin/login/$', django_saml2_auth.views.signin),
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^api/profile', views.UserView.as_view()),
    url(r'^', serve, kwargs={'path': 'index.html'}),
]
