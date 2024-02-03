from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from authentication_app.models import User
from django.contrib.auth import authenticate
from django.contrib import auth
from django.urls import reverse
from django.contrib import messages

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
                request.session['member_id'] = user.id
                auth.login(request, user)
                return JsonResponse({'code':200, 'url':''})

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