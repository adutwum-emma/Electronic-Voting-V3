from datetime import datetime
from root_app.models import CurrentElection

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