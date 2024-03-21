from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, JsonResponse
from authentication_app.models import User
from django.contrib.auth import authenticate
from django.contrib import auth
from django.urls import reverse
from django.contrib import messages
from django.contrib.auth.decorators import user_passes_test
from root_app.models import VerifiedElectorate, Vote, CurrentElection
from e_voting_13.random_password import generate_password
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from root_app.tokens import account_activation_token
from django.contrib import messages
from root_app.emails import send_password_resetlink
from e_voting_13.sms import mnotify
from django.contrib.sites.shortcuts import get_current_site


def login(request):

    if request.method == 'POST':
        
        username = request.POST['username']
        password = request.POST['password']

        next_url = request.GET.get('next')

        user = authenticate(username=username, password=password)

        if user is not None:

            if not user.is_active:
                return JsonResponse({'code':400, 'message':'Your account is inactive, contact admin'})

            if user.user_type == 'superuser':
                request.session['member_id'] = user.id
                auth.login(request, user)

                if next_url:
                    return JsonResponse({'code':200, 'url':next_url})
                
                return JsonResponse({'code':200, 'url':reverse('root_app:dashboard')})
            
            elif user.user_type == 'staff':
                request.session['member_id'] = user.id
                auth.login(request, user)

                if next_url:
                    return JsonResponse({'code':200, 'url':next_url})

                return JsonResponse({'code':200, 'url':reverse('root_app:dashboard')})
            
            elif user.user_type == 'user':

                if CurrentElection.objects.all().last():
                    current_election = CurrentElection.objects.all().last()

                    if not VerifiedElectorate.objects.filter(user=user, election=current_election.election).exists():
                        return JsonResponse({'code':400, 'message':'You are not verified'})
                    
                    # elif Vote.objects.filter(user=user, election=current_election.election):
                    #     return JsonResponse({'code':400, 'message':'You have voted already'})


                request.session['member_id'] = user.id
                auth.login(request, user)

                if next_url:
                    return JsonResponse({'code':200, 'url':next_url})

                return JsonResponse({'code':200, 'url':reverse('root_app:voting_ballot')})

        else:
            return JsonResponse({'code':400, 'message':'Invalid username or password, try again.'})
        
    else:
        return render(request, 'authentication_app/login.html')

def logout(request):

    messages.info(request, 'You have logged out successfully')

    auth.logout(request)
    try:
        del request.session['member_id']
    except KeyError:
        pass
    return redirect('authentication_app:login')

def self_verification(request):

    if request.method == 'POST':
        username = request.POST['username']

        password = generate_password(5)

        protocol = 'https://' if request.is_secure() else 'http://'

        url = reverse('authentication_app:login')

        message = f'#OTP: {password}. Visit {protocol}{get_current_site(request).domain}{url} to start voting.'

        if username == '':
            return JsonResponse({'code':400, 'message':'Enter a Username or Email'})

        if User.objects.filter(username=username).exists() or User.objects.filter(email=username).exists():
            if User.objects.filter(username=username).exists():
                user = User.objects.get(username=username)
            
            elif User.objects.filter(email=username).exists():
                user = User.objects.get(email=username)

            if user.user_type == 'user':
                user.set_password(password)
                user.save()

                if mnotify('', 'toskybrown', user.phone_number, message):
                    
                    messages.info(request, f'Your code has been sent successfully either into your email or your phone, use that as your password to log in')

                    return JsonResponse({'code':200, 'message':'Code sent successfully', 'url':reverse('authentication_app:login')})
                return JsonResponse({'code':400, 'message':'Something went wrong, try again.'})
            
            else:
                return JsonResponse({'code':400, 'message':'User not exist as Electorate'})
        else:
            return JsonResponse({'code':400, 'message':'Username or Email do not exist'})
    
    return render(request, 'authentication_app/self_verification.html')


def password_reset(request, user_id, token):

    print(force_str(urlsafe_base64_decode(user_id)))

    
    user = get_object_or_404(User, pk=force_str(urlsafe_base64_decode(user_id)))

    if request.method == 'POST':
        new_password = request.POST['password']
        con_password = request.POST['con_password']

        if not new_password:
            return JsonResponse({'code':400, 'message':'New password field required'})

        if new_password != con_password:
            return JsonResponse({'code':400, 'message':'Passwords donot match'})
        user.set_password(new_password)
        user.save()

        messages.info(request, "Password changed successfully")
        return JsonResponse({'code':200, 'message':'Password changed successfully', 'url':reverse('authentication_app:login')})
    
    if not user and account_activation_token.check_token(user, token):
        return HttpResponse('Invalid URL')
    context = {
        'uid':user_id,
        'token':token
    }
    return render(request, 'authentication_app/password_reset.html', context)


def forgot_password(request):

    if request.method == 'POST':
        username = request.POST['username']

        if not username:
            return JsonResponse({'code':400, 'message':'Enter username or email'})

        if User.objects.filter(username=username).exists():
            
            user = User.objects.get(username=username)
        
        elif User.objects.filter(email=username).exists():

            user = User.objects.get(email=username)

        else:
            return JsonResponse({'code':400, 'message':'The email or username you entered does not exist'})
        
        if user.user_type == 'user':
            return JsonResponse({'code':400, 'message':'You are not authorized to permform this action'})

        if send_password_resetlink(request, user, user.email):
            return JsonResponse({'code':200, 'message':f'A password reset link sent to {user.email} to into your inbox to change your password'})
        else:
            return JsonResponse({'code':200, 'message':'Something went wrong, try again. Contact administrator if problem persist.'})

    return render(request, 'authentication_app/forgot_password.html')