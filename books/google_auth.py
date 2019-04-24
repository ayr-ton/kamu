from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from social_django.utils import load_backend, load_strategy
from django.contrib.auth import get_user_model

class GoogleAuthentication(BaseAuthentication):
    def authenticate(self, request):
        print('GoogleAuthentication')
        authorization = request.META.get('HTTP_AUTHORIZATION')
        if authorization:
            try:
                token = authorization.replace('Bearer ', '')
                strategy = load_strategy(request=request)
                backend = load_backend(strategy, 'google-oauth2', '')
                user = backend.user_data(token)
                return self.authenticate_credentials(user), None
            except Exception as e:
                raise AuthenticationFailed('Invalid Google token')
        return None

    def authenticate_credentials(self, payload):
        User = get_user_model()
        email = payload['email']

        if not email:
            msg = _('Invalid payload.')
            raise AuthenticationFailed(msg)

        try:
            user = User.objects.get_by_natural_key(email)
        except User.DoesNotExist:
            msg = _('Invalid signature.')
            raise AuthenticationFailed(msg)

        if not user.is_active:
            msg = _('User account is disabled.')
            raise AuthenticationFailed(msg)

        return user