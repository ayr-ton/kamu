from django.shortcuts import redirect


class SamlRelayStateMiddleware:
    """Handle IdP-initiated SSO when Okta's Default Relay State is set to the
    ACS URL. Without this, Okta redirects the user to /okta-login/acs/ as a GET
    after login, which fails because the ACS view expects a POST with a SAML
    response. This middleware catches that GET and sends the user to / instead."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.method == 'GET' and request.path.rstrip('/') == '/okta-login/acs':
            return redirect('/')
        return self.get_response(request)
