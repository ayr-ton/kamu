import os

SETTINGS_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE_DIR = os.path.abspath(os.path.join(SETTINGS_DIR, '..'))

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'webpack_loader',
    'books',
    'waitlist',
    'django_saml2_auth',
    'filters',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'kamu.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

WSGI_APPLICATION = 'kamu.wsgi.application'

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

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'assets'),
    os.path.join(BASE_DIR, 'public')
]

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
        'IGNORE': []
    }
}

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'books.google_auth.GoogleAuthentication'
    ),
    'DEFAULT_PAGINATION_CLASS': ('rest_framework.pagination.PageNumberPagination'),
    'PAGE_SIZE': 50
}

if os.environ.get("OKTA_METADATA_URL") != None:
    SAML2_AUTH = {
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
        }
    }
    SAML2_AUTH['METADATA_AUTO_CONF_URL'] = os.environ['OKTA_METADATA_URL']

GOOGLE_SIGNIN_SUPPORT = os.environ.get("GOOGLE_OAUTH2_KEY") != None

if GOOGLE_SIGNIN_SUPPORT:
    INSTALLED_APPS += ('social_django',)

    TEMPLATES[0]['OPTIONS']['context_processors'] += (
        'social_django.context_processors.backends',
        'social_django.context_processors.login_redirect'
    )

    AUTHENTICATION_BACKENDS = (
        'social_core.backends.open_id.OpenIdAuth',
        'social_core.backends.google.GoogleOpenId',
        'social_core.backends.google.GoogleOAuth2',
        'django.contrib.auth.backends.ModelBackend'
    )

    LOGIN_URL = 'accounts/login'
    LOGIN_REDIRECT_URL = '/'

    SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = os.environ['GOOGLE_OAUTH2_KEY']
    SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = os.environ['GOOGLE_OAUTH2_SECRET']
