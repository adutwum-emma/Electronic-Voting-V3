from django.urls import path
from . import views

app_name = 'root_app'

urlpatterns = [
    path('dashboard/', views.dashboard, name='dashboard'),
    path('add_user/', views.add_user, name='add_user'),
    path('users/', views.users, name='users'),
    path('delete_user/', views.delete_user, name='delete_user'),
    path('edit_user/<str:user_id>/', views.edit_user, name='edit_user'),
    path('view_user/<str:user_id>/', views.view_user, name='view_user'),
    path('group/', views.group, name='group'),
    path('edit_group/<str:group_id>/', views.group, name='group'),
    path('groups/', views.groups, name='groups'),
    path('delete_group/', views.delete_group, name='delete_group'),
    path('group_permissions/<str:group_id>/', views.group_permissions, name='group_permissions'),
    path('search_permissions/', views.search_permissions, name='search_permissions'),
    path('programme/', views.programme, name='programme'),
    path('edit_programme/<str:programme_id>/', views.programme, name='programme'),
    path('programmes/', views.programmes, name='programmes'),
    path('delete_programme/', views.delete_programme, name='delete_programme'),
    path('permissible_page/', views.permissible_page, name='permissible_page'),
    path('year_class/', views.year_class, name='year_class'),
    path('edit_year_class/<str:class_id>/', views.year_class, name='year_class'),
    path('classes/', views.classes, name='classes'),
    path('delete_class/', views.delete_class, name='delete_class'),
    path('hall/', views.hall, name='hall'),
    path('edit_hall/<str:hall_id>/', views.hall, name='hall'),
    path('halls/', views.halls, name='halls'),
    path('delete_hall/', views.delete_hall, name='delete_hall'),
    path('polling_station/', views.polling_station, name='polling_station'),
    path('edit_pollingstation/<str:station_id>/', views.polling_station, name='polling_station'),
    path('polling_stations/', views.polling_stations, name='polling_stations'),
    path('delete_pollingstation/', views.delete_pollingstation, name='delete_pollingstation'), 
    path('election/', views.election, name='election'), 
    path('elections/', views.elections, name='elections'), 
    path('edit_election/<str:election_id>/', views.edit_election, name='edit_election'), 
    path('delete_election/', views.delete_election, name='delete_election'), 
    path('add_electorate/', views.add_electorate, name='add_electorate'),
    path('get_class/', views.get_class, name='get_class'), 
    path('electorates/', views.electorates, name='electorates'), 
    path('edit_electorate/<str:electorate_id>/', views.edit_electorate, name='edit_electorate'),     
    path('electorate_excelupload/', views.electorate_excelupload, name='electorate_excelupload'),     
    path('get_excel_data/', views.get_excel_data, name='get_excel_data'),     
    path('delete_electorate/', views.delete_electorate, name='delete_electorate'),     
    path('delete_bulkelectorates/', views.delete_bulkelectorates, name='delete_bulkelectorates'),     
    path('position/', views.position, name='position'),     
    path('edit_position/<str:position_id>/', views.position, name='position'),     
    path('positions/', views.positions, name='positions'),     
    path('delete_position/', views.delete_position, name='delete_position'),     
    path('position_filter/', views.position_filter, name='position_filter'),     
    path('add_aspirant/', views.add_aspirant, name='add_aspirant'),     
    path('filter_ballotnumber/', views.filter_ballotnumber, name='filter_ballotnumber'),     
    path('aspirants/', views.aspirants, name='aspirants'),     
    path('edit_aspirant/<str:aspirant_id>/', views.edit_aspirant, name='edit_aspirant'),     
    path('delete_aspirant/', views.delete_aspirant, name='delete_aspirant'),     
    path('view_aspirant/', views.view_aspirant, name='view_aspirant'),     
    path('filter_aspirant/', views.filter_aspirant, name='filter_aspirant'),     
    path('election_results/', views.election_results, name='election_results'),     
    path('verification/', views.verification, name='verification'),     
    path('verified_electorates/', views.verified_electorates, name='verified_electorates'),     
    path('unverify_electorate/', views.unverify_electorate, name='unverify_electorate'),     
    path('getting_totalaspirants/', views.getting_totalaspirants, name='getting_totalaspirants'),     
    path('voting_ballot/', views.voting_ballot, name='voting_ballot'),     
    path('set_currentelection/', views.set_currentelection, name='set_currentelection'),     
    path('get_selected_aspirants/', views.get_selected_aspirants, name='get_selected_aspirants'),     
    path('cast_vote/', views.cast_vote, name='cast_vote'),     
    path('results/<str:election_id>/', views.results, name='results'),     
    path('get_results/<str:election_id>/', views.get_results, name='get_results'),     
    path('print_results/<str:election_id>/', views.print_results, name='print_results'),     
    path('detailed_report/', views.detailed_report, name='detailed_report'),     
    path('send_password_link/', views.send_password_link, name='send_password_link'),     
    path('general_report/', views.general_report, name='general_report'),     
    path('institution_info/', views.institution_info, name='institution_info'),     
]