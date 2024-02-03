from datetime import datetime

def date_today(request):

    today = datetime.now().date()

    return {
        'today':today
    }