from django.contrib.auth.backends import ModelBackend

from .models import User


class UniversityIdOrEmailBackend(ModelBackend):
    """FR-01: log in with the university ID (username) or the email address."""

    def authenticate(self, request, username=None, password=None, **kwargs):
        if username and "@" in username:
            user = User.objects.filter(email__iexact=username).first()
            if user is None:
                User().set_password(password)  # same timing as a real check
                return None
            username = user.username
        return super().authenticate(request, username=username, password=password, **kwargs)
