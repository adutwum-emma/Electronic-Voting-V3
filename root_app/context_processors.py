from datetime import datetime
from root_app.models import CurrentElection, PollingStation, ElectorateProfile, Election
from authentication_app.models import User

def date_today(request):

    today = datetime.now().date()

    return {
        'today':today
    }

def current_election(request):

    election = CurrentElection.objects.all().last()

    return {
        'current_election':election
    }


def total_electorates(request):

    current_election = CurrentElection.objects.all().last()

    election = Election.objects.get(id=current_election.election.id)

    total = 0

    for data in election.allowedpollingstation_set.all():
        total += ElectorateProfile.objects.filter(polling_station=data.polling_station).count()

    # users = User.objects.all() 

    # filtered_users = []

    # for data in users:
    #     if data.user_type == 'user':
    #         filtered_users.append(data)
    
    return {
        'total_electorates':total
    }