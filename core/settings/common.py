import os
from decouple import config, Csv
from dj_database_url import parse as dburl


SETTINGS_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_DIR = os.path.abspath(os.path.join(SETTINGS_DIR, '..'))

SECRET_KEY = config('SECRET_KEY', default='5%5*wq!wtipnzre-n!d*6@02j)en6*g1sr+!p1zv-krr$aay1=')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='', cast=Csv())
CSRF_TRUSTED_ORIGINS = [
    f'https://{host}' for host in ALLOWED_HOSTS if host and host != '*'
]


default_dburl = 'postgres://kamu:kamu@localhost:5432/kamu'

OKTA_METADATA_URL = config('OKTA_METADATA_URL', default=None)
OKTA_ASSERTION_URL = config('OKTA_ASSERTION_URL', default=None)

DATABASES = {
    'default': config('DATABASE_URL', default=default_dburl, cast=dburl)
}


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'books',
    'waitlist',
    'django_saml2_auth',
    'import_export',
]


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'core.middleware.SamlRelayStateMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'core/templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages'
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
    os.path.join(BASE_DIR, 'assets'),
]

WHITENOISE_MAX_AGE = 31536000

if OKTA_METADATA_URL is not None:
    SAML2_AUTH = {
        'METADATA_AUTO_CONF_URL': OKTA_METADATA_URL,
        'ASSERTION_URL': OKTA_ASSERTION_URL,
        'ENTITY_ID': '%s/okta-login/acs/' % OKTA_ASSERTION_URL,
        'DEFAULT_NEXT_URL': '/',
        'NEW_USER_PROFILE': {
            'USER_GROUPS': [],
            'ACTIVE_STATUS': True,
            'STAFF_STATUS': True,
            'SUPERUSER_STATUS': True,
        },
        'ATTRIBUTES_MAP': {
            'email': 'email',
            'username': 'email',
            'first_name': 'firstName',
            'last_name': 'lastName',
        },
        'TOKEN_REQUIRED': False,
        'AUTHN_REQUESTS_SIGNED': False,
        'LOGOUT_REQUESTS_SIGNED': False,
        'WANT_ASSERTIONS_SIGNED': False,
        'WANT_RESPONSE_SIGNED': False,
    }

KAMU_ENABLE_ASYNC_TASKS = config('KAMU_ENABLE_ASYNC_TASKS', default=False, cast=bool)

EMAIL_BACKEND = os.environ.get('DJANGO_EMAIL_BACKEND', 'django.core.mail.backends.smtp.EmailBackend')
EMAIL_FROM = os.environ.get('DJANGO_EMAIL_FROM')
EMAIL_HOST = os.environ.get('DJANGO_EMAIL_HOST')
EMAIL_PORT = os.environ.get('DJANGO_EMAIL_PORT')
EMAIL_HOST_USER = os.environ.get('DJANGO_EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.environ.get('DJANGO_EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = True
