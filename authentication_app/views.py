from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from authentication_app.models import User
from django.contrib.auth import authenticate
from django.contrib import auth
from django.urls import reverse
from django.contrib import messages
from django.contrib.auth.decorators import user_passes_test
from root_app.models import VerifiedElectorate, Vote, CurrentElection
from e_voting_13.random_password import generate_password


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
                messages.info(request, f'Your code has been sent successfully either into your email or your phone, use that as your password to log in')
                return JsonResponse({'code':200, 'message':'Code sent successfully', 'url':reverse('authentication_app:login')})
            
            else:
                return JsonResponse({'code':400, 'message':'User not exist as Electorate'})
        else:
            return JsonResponse({'code':400, 'message':'Username or Email do not exist'})
    
    return render(request, 'authentication_app/self_verification.html')