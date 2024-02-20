from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from authentication_app.models import User
from django.contrib.auth import authenticate
from django.contrib import auth
from django.urls import reverse
from django.contrib import messages
from django.contrib.auth.decorators import user_passes_test
from root_app.models import VerifiedElectorate, Vote, CurrentElection


def login(request):

    if request.method == 'POST':
        
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)

        if user is not None:

            if user.user_type == 'superuser':
                request.session['member_id'] = user.id
                auth.login(request, user)
                return JsonResponse({'code':200, 'url':reverse('root_app:dashboard')})
            
            elif user.user_type == 'staff':
                request.session['member_id'] = user.id
                auth.login(request, user)
                return JsonResponse({'code':200, 'url':reverse('root_app:dashboard')})
            
            elif user.user_type == 'user':

                if CurrentElection.objects.all().last():
                    current_election = CurrentElection.objects.all().last()

                    if not VerifiedElectorate.objects.filter(user=user, election=current_election.election).exists():
                        return JsonResponse({'code':400, 'message':'You are not verified'})
                    
                    elif Vote.objects.filter(user=user, election=current_election.election):
                        return JsonResponse({'code':400, 'message':'You have voted already'})

                request.session['member_id'] = user.id
                auth.login(request, user)
                return JsonResponse({'code':200, 'url':reverse('root_app:voting_ballot')})

        else:
            return JsonResponse({'code':400, 'message':'Invalid username or password, try again.'})
        
    else:
        return render(request, 'authentication_app/login.html')

def logout(request):

    messages.info(request, 'You are logged out')

    auth.logout(request)
    try:
        del request.session['member_id']
    except KeyError:
        pass
    return redirect('authentication_app:login')