from django.utils.html import strip_tags
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from .tokens import account_activation_token

def send_password_resetlink(request, user, receipient_email):
    subject = "Password Reset"

    html_mail = render_to_string('root_app/password_reset_temp.html', {
        'domain': get_current_site(request).domain,
        'protocol':'https:' if request.is_secure() else 'http:',
        'user':user,
        'eid':urlsafe_base64_encode(force_bytes(user.id)),
        'token':account_activation_token.make_token(user)
    })

    stripped_message = strip_tags(html_mail)

    mail = EmailMultiAlternatives(
        subject=subject,
        body=stripped_message,
        from_email=None,
        to=[receipient_email]
    )

    mail.attach_alternative(html_mail, 'text/html')

    if mail.send():
        return True
    return False