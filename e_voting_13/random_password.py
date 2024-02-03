from random import *

def generate_password(length):

    numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    random_numbers = []

    for number in range(length):
        random_numbers.append(choice(numbers))
    
    final_password = ''.join(random_numbers)

    return final_password