from django.shortcuts import render, redirect
from django.contrib.auth.decorators import user_passes_test, login_required, permission_required
from root_app.models import User
from django.http import JsonResponse
from e_voting_13.random_password import generate_password
from django.contrib.auth.models import Group, Permission
from django.db.models import Q
from root_app.models import (Programme, YearClass, 
                             Hall, PollingStation, 
                             Election, ElectoralCommissioner, 
                             AllowedPollingStation, Programme,
                             Hall, PollingStation, ElectorateProfile)
from openpyxl import workbook

def is_superuser(user):

    if user.is_authenticated:

        try:
            user.user_type == 'admin'
            return 'admin'
        
        except User.DoesNotExist:
            return False

    else:
        return False


@login_required(login_url='authentication_app:login')
def dashboard(request):

    return render(request, 'root_app/dashboard.html')


@login_required(login_url='athentication_app:login')
def permissible_page(request):

    return render(request, 'root_app/perm_page.html')



@login_required(login_url='authentication_app:login')
@permission_required('authentication_app.add_user', login_url='root_app:permissible_page')
def add_user(request):

    if request.method == 'POST':
        
        username = request.POST['username']
        email = request.POST['email']
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        other_name = request.POST['other_name']
        phone = request.POST['phone_number']
        user_type = request.POST['user_type']

        if username == '':
            return JsonResponse({'code':400, 'message':'Username required'})
        
        elif User.objects.filter(username=username).exists():
            return JsonResponse({'code':400, 'message':'Email already exist'})
        
        elif User.objects.filter(email=email).exists():
            return JsonResponse({'code':400, 'message':'Email already exist'})
        
        elif User.objects.filter(phone_number=phone).exists():
            return JsonResponse({'code':400, 'message':'Phone number already exist'})
        
        elif phone == '':
            return JsonResponse({'code':400, 'message':'Phone number required'})
        
        elif email == '':
            return JsonResponse({'code':400, 'message':'Email required'})
        
        elif first_name == '':
            return JsonResponse({'code':400, 'message':'Email required'})
        
        elif last_name == '':
            return JsonResponse({'code':400, 'message':'Last name required'})
        
        elif user_type == '':
            return JsonResponse({'code':400, 'message':'Select user type'})

        if user_type == 'superuser':
            user = User.objects.create_superuser(
                username=username,
                email=email,
                first_name=first_name,
                last_name=last_name,
                other_name=other_name,
                password=generate_password(10),
                phone_number=phone
            )
            user.save()

            return JsonResponse({'code':200, 'message':'User added successfully'})

        elif user_type == 'staff':
            user = User.objects.create_staffuser(
                username=username,
                email=email,
                first_name=first_name,
                last_name=last_name,
                other_name=other_name,
                password=generate_password(10),
                phone_number=phone
            )
            user.save()

            return JsonResponse({'code':200, 'message':'User added successfully'})
        
        else:
            user = User.objects.create_user(
                username=username,
                email=email,
                first_name=first_name,
                last_name=last_name,
                other_name=other_name,
                password=generate_password(10),
                phone_number=phone

            )
            user.save()

            return JsonResponse({'code':200, 'message':'User added successfully'})

    else:

        return render(request, 'root_app/user.html')


@login_required(login_url='authentication_app:login')
@permission_required('authentication_app.view_users', login_url='root_app:permissible_page')
def users(request):

    users = User.objects.all()

    context = {
        'users': users
    }

    return render(request, 'root_app/users.html', context)
    

@login_required(login_url='authentication_app:login')
@permission_required('authentication_app.change_user', login_url='root_app:permissible_page')
def edit_user(request, user_id):

    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        other_name = request.POST['other_name']
        phone = request.POST['phone_number']
        user_type = request.POST['user_type']

        user = User.objects.get(id=user_id)

        if username == '':
            return JsonResponse({'code':400, 'message':'Username required'})
        
        elif User.objects.filter(username=username).exists() and user.username != username:
            return JsonResponse({'code':400, 'message':'Email already exist'})
        
        elif User.objects.filter(email=email).exists() and user.email != email:
            return JsonResponse({'code':400, 'message':'Email already exist'})
        
        elif User.objects.filter(phone_number=phone).exists() and user.phone_number != phone:
            return JsonResponse({'code':400, 'message':'Phone number already exist'})
        
        elif phone == '':
            return JsonResponse({'code':400, 'message':'Phone number required'})
        
        elif email == '':
            return JsonResponse({'code':400, 'message':'Email required'})
        
        elif first_name == '':
            return JsonResponse({'code':400, 'message':'Email required'})
        
        elif last_name == '':
            return JsonResponse({'code':400, 'message':'Last name required'})
        
        elif user_type == '':
            return JsonResponse({'code':400, 'message':'Select user type'})

        if user_type == 'superuser':
            user.username=username
            user.email=email
            user.first_name=first_name
            user.last_name=last_name
            user.other_name=other_name
            user.phone_number=phone
            user.superuser=True
            user.staff=True
            user.save()

            return JsonResponse({'code':200, 'message':'User updated successfully'})

        elif user_type == 'staff':
            user.username=username
            user.email=email
            user.first_name=first_name
            user.last_name=last_name
            user.other_name=other_name
            user.phone_number=phone
            user.superuser=False
            user.staff=True
            user.save()
            return JsonResponse({'code':200, 'message':'User updated successfully'})
        
        else:
            user.username=username
            user.email=email
            user.first_name=first_name
            user.last_name=last_name
            user.other_name=other_name
            user.phone_number=phone
            user.superuser=False
            user.staff=False
            user.save()
            return JsonResponse({'code':200, 'message':'User updated successfully'})
    else:

        try:

            user = User.objects.get(id=user_id)
            
            context = {
                'user':user
            }

            return render(request, 'root_app/edit_user.html', context)


        except User.DoesNotExist:
            return render(request, 'root_app/error-404.html')
        
        except ValueError:
            return render(request, 'root_app/error-404.html')


@login_required(login_url='authentication_app:login')
@permission_required('authentication_app.view_user', login_url='root_app:permissible_page')
def view_user(request, user_id):

    if request.method =='POST':
        
        group_ids = request.POST.getlist('groups')

        user = User.objects.get(id=user_id)

        if not request.user.has_perm('authentication_app.assign_group'):
            return JsonResponse({'code':400, 'message':'You are not permittable'})

        user.groups.clear()

        for data in group_ids:
            user.groups.add(Group.objects.get(id=data))
        
        return JsonResponse({'code':200, 'message':'Groups assigned successfully'})

    else:
        try:

            permissions = Permission.objects.all()
            
            user = User.objects.get(id=user_id)

            groups = []

            gps = Group.objects.all()

            for data in gps:
                
                if user.groups.filter(id=int(data.id)).exists():
                    continue
                else:
                    groups.append(
                        {'id':data.id, 'name':data.name}
                    )

            selected_groups = user.groups.all()
                    
            context = {
                'data':user,
                'groups':groups,
                'seleted_groups':selected_groups,
                'permissions':permissions,
            }

            return render(request, 'root_app/view_user.html', context)
        
        except User.DoesNotExist:
            return render(request, 'root_app/error-404.html')
        
        except ValueError:
            return render(request, 'root_app/error-404.html')



@login_required(login_url='authentication_app:login')
@permission_required('authentication_app.delete_user', login_url='root_app:permissible_page')
def delete_user(request):

    try:

        user_id = request.POST['user_id']

        User.objects.get(id=user_id).delete()

        return JsonResponse({'code':200, 'message':'User has been deleted successfully'})
    
    except User.DoesNotExist:
        return JsonResponse({'code':400, 'message':'Invalid user id or does not exist'})
    
    except Exception:
        return JsonResponse({'code':400, 'message':'Something went wrong, try again'})


@login_required(login_url='authentication_app:login')
@permission_required({('auth.add_group'), ('auth.change_group')}, login_url='root_app:permissible_page')
def group(request, group_id=None):

    is_update = False

    if group_id is not None:
        is_update = True  

    if request.method == 'POST':
        group_name = request.POST['group']

        if group_name == '':
            return JsonResponse({'code':400, 'message':'Group name required'})

        if not is_update:
            group = Group.objects.create(
                name=group_name
            )
            group.save()
            return JsonResponse({'code':200, 'message':'Group added successfully'})
        else:
            group = Group.objects.get(id=group_id)
            group.name = group_name
            group.save()
            return JsonResponse({'code':200, 'message':'Group is has been updated successfully'})
    else:
        
        if is_update:

            try:
                group = Group.objects.get(id=group_id)

            except Group.DoesNotExist:
                return render(request, 'root_app/error-404.html')
                
            except ValueError:
                return render(request, 'root_app/error-404.html')

            context = {
                'group': group,
                'is_update':is_update,
            }
            return render(request, 'root_app/group.html', context)
        
        return render(request, 'root_app/group.html')



@login_required(login_url='authentication_app:login')
@permission_required('auth.view_group', login_url='root_app:permissible_page')
def groups(request):

    groups = Group.objects.all()

    context = {
        'groups':groups
    }

    return render(request, 'root_app/groups.html', context)


@login_required(login_url='authentication_app:login')
@permission_required('auth.delete_group', login_url='root_app:permissible_page')
def delete_group(request):

    try:

        group_id = request.POST['group_id']

        Group.objects.get(id=group_id).delete()

        return JsonResponse({'code':200, 'message':'Group has been deleted successfully'})
    
    except User.DoesNotExist:
        return JsonResponse({'code':400, 'message':'Invalid group id or does not exist'})
    
    except Exception:
        return JsonResponse({'code':400, 'message':'Something went wrong, try again'})


@login_required(login_url='authentication_app:login')
@permission_required({('auth.add_permission'), ('auth.change_permission')}, login_url='root_app:permissible_page')
def group_permissions(request, group_id):

    if request.method == 'POST':

        try:
            sel_permissions = request.POST.getlist('perm_ids[]')

            # if len(sel_permissions) <= 0:
            #     return JsonResponse({'code':400, 'message':'No permission selected'})

            group = Group.objects.get(id=group_id)

            group.permissions.clear()

            for data in sel_permissions:

                permission = Permission.objects.get(id=data)

                group.permissions.add(permission)

            return JsonResponse({'code':200, 'message':'Saved successfully'})

        except Exception as ex:
            return JsonResponse({'code':400, 'message':'Something went wrong try again'})
        
    else:

        try:

            group = Group.objects.get(id=group_id)

            request.session['group_id'] = group.id

        except Group.DoesNotExist:
            return render(request, 'root_app/error-404.html')
        
        except ValueError:
            return render(request, 'root_app/error-404.html')

        permissions = []

        perms = Permission.objects.all()

        for data in perms:

            if group.permissions.filter(id=data.id).exists():
                continue
            else:
                permissions.append(
                    {
                        'id':data.id,
                        'name':data.name,
                        'codename':data.codename
                    }
                )
    
        group_permissions = group.permissions.all()

        context = {
            'permissions':permissions,
            'group':group,
            'group_permissions':group_permissions
        }

        return render(request, 'root_app/group_permissions.html', context)



@login_required(login_url='authentication_app:login')
def search_permissions(request):

    search_item = request.POST['search_item']

    perms = Permission.objects.filter(
        Q(name__icontains=search_item) | Q(codename__icontains=search_item)
    )

    permission = []

    group = Group.objects.get(id=request.session['group_id'])

    for data in perms:
        if group.permissions.filter(id=data.id).exists():
            continue
        else:
            permission.append(
                {
                    'id':data.id,
                    'name':data.name,
                    'codename':data.codename
                }
            )

    return JsonResponse({'permissions':permission})


@login_required(login_url='authentication_app:login')
@permission_required('root_app.add_programme', login_url='root_app:permissible_page')
def programme(request, programme_id=None):

    is_update = False

    if programme_id is not None:
        is_update = True

    if request.method == 'POST':
        programme_name = request.POST['programme_name']

        if programme_name == '':
            return JsonResponse({'code':400, 'message':'Programme name required'})
        
        if not is_update:

            programme = Programme.objects.create(
                programme_name=programme_name
            )
            programme.save()

            return JsonResponse({'code':200, 'message':'Programme added successfully'})

        else:

            programme = Programme.objects.get(id=programme_id)
            programme.programme_name = programme_name
            programme.save()

            return JsonResponse({'code':200, 'message':'Programme updated successfully'})

    else:

        if is_update:

            if not request.user.has_perm('root_app.change_programme'):
                return redirect('root_app:permissible_page')
        
            else:

                try:

                    programme = Programme.objects.get(id=programme_id)
                
                except Programme.DoesNotExist:
                    return render(request, 'root_app/error-404.html')
                
                except ValueError:
                    return render(request, 'root_app/error-404.html')

                context = {
                    'programme':programme,
                    'is_update':is_update,
                }

                return render(request, 'root_app/programme.html', context)
        
        return render(request, 'root_app/programme.html')

@login_required(login_url='authentication_app:login')
@permission_required('root_app.view_programme', login_url='root_app:permissible_page')
def programmes(request):

    programmes = Programme.objects.all()

    context = {
        'programmes':programmes
    }

    return render(request, 'root_app/programmes.html', context)


@login_required(login_url='authentication_app:login')
@permission_required('root_app.delete_programme', login_url='root_app:permissible_page')
def delete_programme(request):

    try:

        pro_id = request.POST['programme_id']

        Programme.objects.get(id=pro_id).delete()

        return JsonResponse({'code':200, 'message':'Programme has been deleted'})

    except Programme.DoesNotExist:
        return JsonResponse({'code':400, 'message':'Invalid programme id or does not exist'})
    
    except Exception:
        return JsonResponse({'code':400, 'message':'Something went wrong, try again'})


@login_required(login_url='authentication_app:login')
@permission_required('root_app.add_yearclass', login_url='root_app:permissible_page')
def year_class(request, class_id=None):

    is_update = False

    if class_id is not None:
        is_update = True

    if request.method == 'POST':

        class_name = request.POST['class_name']
        pro_id = request.POST['programme_id']
        year = request.POST['year']

        if class_name == '':
            return JsonResponse({'code':400, 'message':'Class name required'})
        
        if pro_id == '':
            return JsonResponse({'code':400, 'message':'Programme required'})

        if is_update:

            if YearClass.objects.filter(class_name=class_name).exists() and YearClass.objects.get(id=class_id).class_name != class_name:
                return JsonResponse({'code':400, 'message':'Class name already exist'})

            year_class = YearClass.objects.get(id=class_id)
            year_class.class_name=class_name
            year_class.year=year
            year_class.programme=Programme.objects.get(id=pro_id)
            year_class.save()
        
            return JsonResponse({'code':200, 'message':'Class updated successfully'})
        
        else:

            if YearClass.objects.filter(class_name=class_name).exists():
                return JsonResponse({'code':400, 'message':'Class name already exist'})

            year_class = YearClass.objects.create(
                class_name=class_name,
                year=year,
                programme=Programme.objects.get(id=pro_id)
            )

            year_class.save()

            return JsonResponse({'code':200, 'message':'Class added successfully'})

    else:

        programmes = Programme.objects.all()

        context = {
            'programmes':programmes
        }

        if is_update:

            try:
                year_class = YearClass.objects.get(id=class_id)
            except YearClass.DoesNotExist:
                    return render(request, 'root_app/error-404.html')
            except ValueError:
                return render(request, 'root_app/error-404.html')

            base_cont = {
                'class':year_class,
                'is_update':is_update,
            }

            context.update(base_cont)

            if request.user.has_perm('root_app.change_yearclass'):
                return render(request, 'root_app/class.html', context)
                
            else:
                return redirect('root_app:permissible_page')
        
        return render(request, 'root_app/class.html', context)


@login_required(login_url='authentication_app:login')
@permission_required('root_app.view_yearclass', login_url='root_app:permissible_page')
def classes(request):

    classes = YearClass.objects.all()

    context = {
        'classes':classes
    }

    return render(request, 'root_app/classes.html', context)


@login_required(login_url='authentication_app:login')
@permission_required('root_app.delete_yearclass', login_url='root_app:permissible_page')
def delete_class(request):

    try:
        class_id = request.POST['class_id']

        year_class = YearClass.objects.get(id=class_id)
        year_class.delete()

        return JsonResponse({'code':200, 'message':'Class deleted successfully'})
    
    except Programme.DoesNotExist:
        return JsonResponse({'code':400, 'message':'Invalid class id or does not exist'})
    
    except Exception:
        return JsonResponse({'code':400, 'message':'Something went wrong, try again'})


@login_required(login_url='authentication_app:login')
@permission_required('root_app.add_hall', login_url='root_app:permissible_page')
def hall(request, hall_id=None):
    is_update = False

    if hall_id is not None:
        is_update = True

    if request.method == 'POST':
        hall_name = request.POST['hall_name']

        if hall_name == '':
            return JsonResponse({'code':400, 'message':'Hall name required'})

        if is_update:
            hall = Hall.objects.get(id=hall_id)
            hall.hall_name=hall_name
            hall.save()

            return JsonResponse({'code':200, 'message':'Hall name updated successfully'})

        else:
            hall = Hall.objects.create(
                hall_name=hall_name
            )
            hall.save()
            return JsonResponse({'code':200, 'message':'Hall added successfully'})
    else:

        if is_update:

            try:
                hall = Hall.objects.get(id=hall_id)

            except Hall.DoesNotExist:
                return render(request, 'root_app/error-404.html')
            
            except ValueError:
                return render(request, 'root_app/error-404.html')

            context = {
                'hall':hall,
                'is_update':is_update
            }

            if not request.user.has_perm('root_app.change_hall'):
                return redirect('root_app:permissible_page')
            
            return render(request, 'root_app/hall.html', context)
        
        return render(request, 'root_app/hall.html')


@login_required(login_url='authentication_app:login')
@permission_required('root_app.view_hall', login_url='root_app:permissible_page')
def halls(request):

    halls = Hall.objects.all()

    context = {
        'halls':halls
    }

    return render(request, 'root_app/halls.html', context)

@login_required(login_url='authentication_app:login')
@permission_required('root_app.delete_hall', login_url='root_app:permissible_page')
def delete_hall(request):

    try:
        hall_id = request.POST['hall_id']

        year_class = Hall.objects.get(id=hall_id)
        year_class.delete()

        return JsonResponse({'code':200, 'message':'Hall deleted successfully'})
    
    except Programme.DoesNotExist:
        return JsonResponse({'code':400, 'message':'Invalid halls id or does not exist'})
    
    except Exception:
        return JsonResponse({'code':400, 'message':'Something went wrong, try again'})


@login_required(login_url='authentication_app:login')
@permission_required('root_app.add_pollingstation', login_url='root_app:permissible_page')
def polling_station(request, station_id=None):

    is_update = False

    if station_id is not None:
        is_update = True
    
    if request.method == 'POST':
        name = request.POST['name']
        location = request.POST['location']

        if name == '':
            return JsonResponse({'code':400, 'message':'Polling station name required'})

        if is_update:
            polling_station = PollingStation.objects.get(id=station_id)
            polling_station.name=name
            polling_station.location=location
            polling_station.save()
            return JsonResponse({'code':200, 'message':'Polling station updated successfuuly'})
        else:
            
            polling_station = PollingStation.objects.create(
                name=name,
                location=location
            )
            polling_station.save()
            return JsonResponse({'code':200, 'message':'Polling station added successfuuly'})

    else:

        if is_update:
            try: 
                polling_station = PollingStation.objects.get(id=station_id)
            
            except PollingStation.DoesNotExist:
                return render(request, 'root_app/error-404.html')
            
            except ValueError:
                return render(request, 'root_app/error-404.html')
            
            context = {
                'polling_station':polling_station,
                'is_update':is_update,
            }

            if not request.user.has_perm('root_app.change_pollingstation'):
                return redirect('root_app:permissible_page')

            return render(request, 'root_app/polling_station.html', context)
        
        else:

            return render(request, 'root_app/polling_station.html')


@login_required(login_url='authentication_app:login')
@permission_required('root_app.view_pollingstation', login_url='root_app:permissible_page')
def polling_stations(request):

    polling_stations = PollingStation.objects.all()

    context = {
        'polling_stations':polling_stations
    }

    return render(request, 'root_app/polling_stations.html', context)



@login_required(login_url='authentication_app:login')
@permission_required('root_app.delete_pollingstation', login_url='root_app:permissible_page')
def delete_pollingstation(request):

    try:
        poll_id = request.POST['poll_id']

        station = PollingStation.objects.get(id=poll_id)
        station.delete()

        return JsonResponse({'code':200, 'message':'Polling station deleted successfully'})
    
    except Programme.DoesNotExist:
        return JsonResponse({'code':400, 'message':'Invalid pollation station id or does not exist'})
    
    except Exception:
        return JsonResponse({'code':400, 'message':'Something went wrong, try again'})


@login_required(login_url='authentication_app:login')
@permission_required('root_app.add_election', login_url='root_app:permissible_page')
def election(request):

    if request.method == 'POST':

        election_name = request.POST['election_name']
        election_year = request.POST['election_year']
        election_date = request.POST['election_date']
        election_time = request.POST['election_time']
        ending_date = request.POST['ending_date']
        ending_time = request.POST['ending_time']

        if request.user.has_perm('root_app.can_assign_commnissioner_role'):
            commissioner = request.POST['electoral_commissioner']
        else:
            commissioner = request.user.id

        polling_stations = request.POST.getlist('polling_stations')

        if election_name == '':
            return JsonResponse({'code':400, 'message':'Election name required'})
        
        elif election_year == '':
            return JsonResponse({'code':400, 'message':'Election year required'})
        
        elif election_date == '':
            return JsonResponse({'code':400, 'message':'Election date required'})

        elif election_time == '':
            return JsonResponse({'code':400, 'message':'Election time required'})
        
        elif ending_date == '':
            return JsonResponse({'code':400, 'message':'Ending date required'})
        
        elif ending_time == '':
            return JsonResponse({'code':400, 'message':'Ending time required'})
        
        elif commissioner == '':
            return JsonResponse({'code':400, 'message':'Choose electoral commissioner'})
        
        if len(polling_stations) <= 0:
            return JsonResponse({'code':400, 'message':'Choose polling station for this election'})


        election = Election.objects.create(
            election_name=election_name,
            election_year=election_year,
            election_date=election_date,
            election_time=election_time,
            ending_date=ending_date,
            ending_time=ending_time,
        )
        
        try:
            request.POST['status']

        except KeyError:
            election.is_active=False
            election.save()

        if request.POST['mul_votes'] == str(1):
            election.allow_multiple_votes=True
            election.save()
        
        else:
            pass
        
        if commissioner != '':

            ElectoralCommissioner.objects.create(
                election=election,
                user=User.objects.get(id=commissioner)
            ).save()
                
        for data in polling_stations:
            AllowedPollingStation.objects.create(
                election=election,
                polling_station=PollingStation.objects.get(id=data)
            ).save()
        
        return JsonResponse({'code':200, 'message':'Election added successfully'})

    else:

        polling_stations = PollingStation.objects.all()
        users = User.objects.all()

        context = {
            'polling_stations':polling_stations,
            'users':users
        }

        return render(request, 'root_app/election.html', context)


@login_required(login_url='authentication_app:login')
@permission_required('root_app.view_election', login_url='root_app:permissible_page')
def elections(request):

    elections = Election.objects.all()     

    context = {
        'elections':elections
    }

    return render(request, 'root_app/elections.html', context)


@login_required(login_url='authentication_app:login')
@permission_required('root_app.change_election', login_url='root_app:permissible_page')
def edit_election(request, election_id):

    if request.method == 'POST':

        election = Election.objects.get(id=election_id)

        election_name = request.POST['election_name']
        election_year = request.POST['election_year']
        election_date = request.POST['election_date']
        election_time = request.POST['election_time']
        ending_date = request.POST['ending_date']
        ending_time = request.POST['ending_time']

        if request.user.has_perm('root_app.can_assign_commnissioner_role'):
            commissioner = request.POST['electoral_commissioner']
        else:
            commissioner = request.user.id

        polling_stations = request.POST.getlist('polling_stations')

        if election_name == '':
            return JsonResponse({'code':400, 'message':'Election name required'})
        
        elif election_year == '':
            return JsonResponse({'code':400, 'message':'Election year required'})
        
        elif election_date == '':
            return JsonResponse({'code':400, 'message':'Election date required'})

        elif election_time == '':
            return JsonResponse({'code':400, 'message':'Election time required'})
        
        elif ending_date == '':
            return JsonResponse({'code':400, 'message':'Ending date required'})
        
        elif ending_time == '':
            return JsonResponse({'code':400, 'message':'Ending time required'})
        
        elif commissioner == '':
            return JsonResponse({'code':400, 'message':'Choose electoral commissioner'})
        
        if len(polling_stations) <= 0:
            return JsonResponse({'code':400, 'message':'Choose polling station for this election'})

        election.election_name=election_name
        election.election_year=election_year
        election.election_date=election_date
        election.election_time=election_time
        election.ending_date=ending_date
        election.ending_time=ending_time
        
        
        try:
            request.POST['status']

            election.is_active=True
            election.save()

        except KeyError:
            election.is_active=False
            election.save()

        if str(request.POST['mul_votes']) == str(1):
            election.allow_multiple_votes=True
            election.save()
        
        else:
            election.allow_mutiple_votes=False
            election.save()

        
        if commissioner != '':

            commis = ElectoralCommissioner.objects.get(election=election)
            commis.user=User.objects.get(id=commissioner)
            commis.save()
        
        for data in AllowedPollingStation.objects.filter(election=election):
            data.delete()
                
        for data in polling_stations:
            AllowedPollingStation.objects.create(
                election=election,
                polling_station=PollingStation.objects.get(id=data)
            ).save()
        
        return JsonResponse({'code':200, 'message':'Election updated successfully'})
    else:
        try:
            election = Election.objects.get(id=election_id)

            poll_sta = PollingStation.objects.all()

            users = User.objects.all()

            polling_stations = []

            for data in poll_sta:
                if AllowedPollingStation.objects.filter(election=election, polling_station=PollingStation.objects.get(id=data.id)).exists():
                    polling_stations.append(
                        {
                            'id': data.id,
                            'name': data.name,
                            'exist':True
                        }
                    )
                else:

                    polling_stations.append(
                        {
                            'id': data.id,
                            'name': data.name,
                            'exist':False
                        }
                    )

            context = {
                'election':election,
                'polling_stations':polling_stations,
                'users':users
            }

            return render(request, 'root_app/edit_election.html', context)
        
        except Election.DoesNotExist:
            return render(request, 'root_app/error-404.html')
        
        except ValueError:
            return render(request, 'root_app/error-404.html')


@login_required(login_url='authentication_app:login')
@permission_required('root_app.delete_election', login_url='root_app:permissible_page')
def delete_election(request):

    try:
        elec_id = request.POST['elec_id']

        election = Election.objects.get(id=elec_id)
        election.delete()

        return JsonResponse({'code':200, 'message':'Election deleted successfully'})
    
    except Programme.DoesNotExist:
        return JsonResponse({'code':400, 'message':'Election id or does not exist'})
    
    except Exception:
        return JsonResponse({'code':400, 'message':'Something went wrong, try again'})



@login_required(login_url='authentication_app:login')
@permission_required('root_app.add_electorate', login_url='root_app:permissible_page')
def add_electorate(request):

    if request.method == 'POST':
        
        index_number = request.POST['index_number']
        email = request.POST['email']
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        othername = request.POST['othername']
        class_id = request.POST['class']
        hall_id = request.POST['hall']
        polling_station_id = request.POST['polling_station']
        phone = request.POST['phone']

        if index_number == '':
            return JsonResponse({'code':400, 'message':'Index number is required'})
        
        elif email == '':
            return JsonResponse({'code':400, 'message':'Email is required'})
        
        elif first_name == '':
            return JsonResponse({'code':400, 'message':'First name is required'})
        
        elif last_name == '':
            return JsonResponse({'code':400, 'message':'Last name is required'})
        
        elif phone == '':
            return JsonResponse({'code':400, 'message':'Phone number is required'})
        
        elif User.objects.filter(phone_number=phone).exists():
            return JsonResponse({'code':400, 'message':'Phone number already exist'})
        
        elif User.objects.filter(username=index_number).exists():
            return JsonResponse({'code':400, 'message':'Username already exist'})
        
        elif User.objects.filter(email=email).exists():
            return JsonResponse({'code':400, 'message':'Email already exist'})
        
        elif class_id == '':
            return JsonResponse({'code':400, 'message':'Class is required'})
        
        elif hall_id == '':
            return JsonResponse({'code':400, 'message':'Hall is required'})
        
        elif polling_station_id == '':
            return JsonResponse({'code':400, 'message':'Polling station is required'})
        
        else:

            user = User.objects.create_user(
                username=index_number,
                email=email,
                first_name=first_name,
                last_name=last_name,
                other_name=othername,
                phone_number=phone,
                password=generate_password(10)
            )

            ElectorateProfile.objects.create(
                user=user,
                year_class=YearClass.objects.get(id=class_id),
                hall=Hall.objects.get(id=hall_id),
                polling_station=PollingStation.objects.get(id=polling_station_id)
            )

            return JsonResponse({'code':200, 'message':'Electorate added successfully'})

    else:

        programmes = Programme.objects.all()

        halls = Hall.objects.all()

        polling_stations = PollingStation.objects.all()

        context = {
            'programmes':programmes,
            'halls':halls,
            'polling_stations':polling_stations
        }

        return render(request, 'root_app/electorate.html', context)


@login_required(login_url='authentication_app:login')
def get_class(request):

    try:

        programme_id = request.POST['programme_id']

        programme = Programme.objects.get(id=programme_id)

        year_class = YearClass.objects.filter(programme=programme)

        return JsonResponse({'class':list(year_class.values())})
    
    except Exception:

        return JsonResponse({'class':[]})
    


@login_required(login_url='authentication_app:login')
@permission_required('root_app.add_electorate', login_url='root_app:permissible_page')
def electorates(request):

    users = User.objects.all()

    electorates = []

    for data in users:
        if data.user_type == 'user':
            electorates.append(
                {
                    'id':data.id,
                    'index_number':data.username,
                    'full_name':data.full_name,
                    'class': data.electorateprofile.year_class.class_name,
                    'polling_station':data.electorateprofile.polling_station.name
                }
            )

    context = {
        'electorates':electorates
    }

    return render(request, 'root_app/electorates.html', context)


@login_required(login_url='authentication_app:login')
@permission_required('root_app.change_electorate', login_url='root_app:permissible_page')
def edit_electorate(request, electorate_id):

    if request.method == 'POST':

        user = User.objects.get(id=electorate_id)
        
        index_number = request.POST['index_number']
        email = request.POST['email']
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        othername = request.POST['othername']
        class_id = request.POST['class']
        hall_id = request.POST['hall']
        polling_station_id = request.POST['polling_station']
        phone = request.POST['phone']

        if index_number == '':
            return JsonResponse({'code':400, 'message':'Index number is required'})
        
        elif email == '':
            return JsonResponse({'code':400, 'message':'Email is required'})
        
        elif first_name == '':
            return JsonResponse({'code':400, 'message':'First name is required'})
        
        elif last_name == '':
            return JsonResponse({'code':400, 'message':'Last name is required'})
        
        elif phone == '':
            return JsonResponse({'code':400, 'message':'Phone number is required'})
        
        elif User.objects.filter(phone_number=phone).exists() and user.phone_number != phone:
            return JsonResponse({'code':400, 'message':'Phone number already exist'})
        
        elif User.objects.filter(username=index_number).exists() and user.username != index_number:
            return JsonResponse({'code':400, 'message':'Username already exist'})
        
        elif User.objects.filter(email=email).exists() and user.username != index_number:
            return JsonResponse({'code':400, 'message':'Email already exist'})
        
        elif class_id == '':
            return JsonResponse({'code':400, 'message':'Class is required'})
        
        elif hall_id == '':
            return JsonResponse({'code':400, 'message':'Hall is required'})
        
        elif polling_station_id == '':
            return JsonResponse({'code':400, 'message':'Polling station is required'})
        
        else:

            user.username=index_number
            user.email=email
            user.first_name=first_name
            user.last_name=last_name
            user.other_name=othername
            user.phone_number=phone
            user.password=generate_password(10)
            user.save()

            electorate = ElectorateProfile.objects.get(id=user.electorateprofile.id)

            electorate.year_class=YearClass.objects.get(id=class_id)
            electorate.hall=Hall.objects.get(id=hall_id)
            electorate.polling_station=PollingStation.objects.get(id=polling_station_id)
            electorate.save()

            return JsonResponse({'code':200, 'message':'Electorate has been updated successfully'})

    else:
        electorate = User.objects.get(id=electorate_id)

        programmes = Programme.objects.all()

        halls = Hall.objects.all()

        polling_stations = PollingStation.objects.all()

        context = {
            'programmes':programmes,
            'halls':halls,
            'polling_stations':polling_stations,
            'electorate':electorate,
        }

        return render(request, 'root_app/edit_electorate.html', context)


@login_required(login_url='authentication_app:login')
@permission_required('root_app.upload_electorate_with_excel', login_url='root_app:permissible_page')
def electorate_excelupload(request):

    if request.method == 'POST':

        excel_file = request.FILES['excel_file']

        class_id = request.POST['year_class']

        hall_id = request.POST['hall']

        polling_station_id = request.POST['polling_station']

        if excel_file == '':
            return JsonResponse({'code':400, 'message':'Excel file is required'})
        
        elif year_class == '':
            return JsonResponse({'code':400, 'message':'No class is selected'})
        
        elif hall ==  '':
            return JsonResponse({'code':400, 'message':'No hall is selected'})
        
        elif polling_station == '':
            return JsonResponse({'code':400, 'message':'No polling station is selected'})
        
        book = workbook(excel_file)
        
        sheet = book.active

        rows = sheet.rows

        headers = [data.values for data in next(rows)]

        all_data = []

        for row in rows:

            data = {}

            for key, value in zip(headers, row):
                data[key] = value.value
            
            all_data.append(data)
        
        data_response = []

        for data in all_data:

            if data['index_number'] is None:
                data.update(
                    {'response':'Index number is required'}
                )
                data_response.append(data)

            elif User.objects.filter(username=data['index_number']).exists():
                data.update(
                    {'response':'Index number already taken'}
                )
                data_response.append(data)

            elif data['first-name'] is None:
                data.update(
                    {'response':'First name is required'}
                )
                data_response.append(data)
         
            elif data['last_name'] is None:
                data.update(
                    {'response':'Last name is required'}
                )
                data_response.append(data)
            
            elif data['email'] is None:
                data.update(
                    {'response':'Email is required'}
                )
                data_response.append(data)
            
            elif User.objects.filter(email=data['email']).filter():
                data.update(
                    {'response':'Email already taken'}
                )
                data_response.append(data)
            
            else:

                user = User.objects.create_user(
                    username=data['index_number'],
                    first_name=data['first_name'],
                    last_name=data['last_name'],
                    other_name=data['other_name'],
                    email=data['email']
                )

                ElectorateProfile.objects.create(
                    user=user,
                    year_class=YearClass.objects.get(id=class_id),
                    hall=Hall.objects.get(id=hall_id),
                    polling_station=PollingStation.objects.get(id=polling_station_id)
                )

                data.update(
                    {'response':'Saved successfully'}
                )
                data_response.append(data)

                return JsonResponse({'code':200, 'message':'Data uploaded successfully', 'response_data':data_response})
    else:

        programmes = Programme.objects.all()

        halls = Hall.objects.all()

        polling_stations = PollingStation.objects.all()

        context = {
            'programmes':programmes,
            'halls':halls,
            'polling_stations':polling_stations,

        }

        return render(request, 'root_app/electorate_excel_upload.html', context)

def get_excel_data(request):

    excel_file = request.FILES['excel_file']

    book = workbook(excel_file)

    sheet = book.active

    rows = sheet.rows

    headers = [ data.values for data in next(rows) ]

    all_data =[]

    for row in rows:

        data_list = []

        for key, value in zip(headers, row):
            data_list.append(value.value)
        all_data.append(data_list)

    return JsonResponse()