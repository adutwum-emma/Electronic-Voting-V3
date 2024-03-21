import requests
from django.http import HttpResponse

def mnotify(api_key, sender_id, rec_number, message):

    endpoint = 'https://api.mnotify.com/api/sms/quick'

    url = endpoint + '?key=' + api_key

    data = {
        'recipient[]': [rec_number],
        'sender': sender_id,
        'message': message,
        'is_schedule': False,
        'schedule_date': ''
    }

    response = requests.post(url, data)

    data = response.json()

    if data['code'] == '2000':
        return True
    return False

    # url = f'https://apps.mnotify.net/smsapi?key={api_key}&to={rec_number}&msg={message}&sender_id={sender_id}'

    # response = requests.get(url)

    # if response.status_code == 200:
    #     return True
    # else:
    #     return False

def twillo():
    pass
