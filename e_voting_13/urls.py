from django.contrib import admin
from django.urls import path, include
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('authentication/', include('authentication_app.urls')),
    path('root/', include('root_app.urls')),
]
