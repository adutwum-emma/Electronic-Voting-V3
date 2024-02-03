from django.contrib import admin
from . models import (Hall, YearClass, PollingStation, Programme, 
                      Election, ElectoralCommissioner, AllowedPollingStation, 
                      Position, Aspirant, Vote, ElectorateProfile)


admin.site.register(Hall)
admin.site.register(YearClass)
admin.site.register(PollingStation)
admin.site.register(Programme)
admin.site.register(Election)
admin.site.register(ElectoralCommissioner)
admin.site.register(AllowedPollingStation)
admin.site.register(Position)
admin.site.register(Aspirant)
admin.site.register(Vote)
admin.site.register(ElectorateProfile)