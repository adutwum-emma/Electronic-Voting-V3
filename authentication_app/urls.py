from django.urls import path
from . import views

app_name = 'authentication_app'

urlpatterns = [
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('self_verification/', views.self_verification, name='self_verification'),
    path('password_reset/<str:user_id>/<str:token>/', views.password_reset, name='password_reset'),
]