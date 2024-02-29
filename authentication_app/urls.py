from django.urls import path
from . import views

app_name = 'authentication_app'

urlpatterns = [
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('self_verification/', views.self_verification, name='self_verification'),
]