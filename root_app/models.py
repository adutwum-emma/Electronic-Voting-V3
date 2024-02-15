from django.db import models
from authentication_app.models import User

class Programme(models.Model):

    programme_name = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = 'Programmes'
    
    def __str__(self) -> str:
        return self.programme_name

class YearClass(models.Model):

    year = models.PositiveIntegerField()
    class_name = models.CharField(max_length=50)
    programme = models.ForeignKey(Programme, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'Classes'
    
    def __str__(self):
        return self.year

    # def class_programmes(self):
    #     pros = YearClass.objects.filter(programme=self.programme)

    #     return pros

class Hall(models.Model):

    hall_name = models.CharField(max_length=100)

    class Meta:
        verbose_name_plural = 'Halls'
    
    def __str__(self):
        return self.hall_name

class PollingStation(models.Model):

    name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)

    class Meta:
        verbose_name_plural = 'Polling Stations'

    def __str__(self):
        return self.name

class Election(models.Model):

    election_name = models.CharField(max_length=100)
    election_year = models.PositiveIntegerField(null=True, blank=False)
    election_date = models.DateField()
    election_time = models.TimeField()
    ending_date = models.DateField()
    ending_time = models.TimeField()
    allow_multiple_votes = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    time_stamp = models.DateTimeField(auto_now_add=True)
    

    class Meta:
        verbose_name_plural = 'Elections'

        permissions = [
            ('can_assign_commnissioner_role', 'Can assign commissioner role'),
            ('view_results', 'Can view results'),
            ('view_election_results_list', 'Can view election results list'),
            ('view_general_report', 'Can view general report'),
            ('view_detailed_report', 'Can view detailed report'),
        ]
    
    def __str__(self):
        return self.election_name
    
    @property
    def electoral_comm(self):

        election = Election.objects.get(id=self.id)
        return election.electoralcommissioner.user.full_name


class ElectoralCommissioner(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    election = models.OneToOneField(Election, on_delete=models.CASCADE)
    time_stamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Electoral Commissioner'

        permissions= [
            ('verify_electorate', 'Can verify electorate')
        ]
    
    def __str__(self):
        return self.user.full_name

class AllowedPollingStation(models.Model):

    election = models.ForeignKey(Election, on_delete=models.CASCADE)
    polling_station = models.ForeignKey(PollingStation, on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'Allowed Polling Stations'
    

    def __str__(self) -> str:
        return self.election.election_name + " - " + self.polling_station.name

class Position(models.Model):

    election = models.ForeignKey(Election, on_delete=models.CASCADE)
    position_name = models.CharField(max_length=50)
    position_description = models.TextField()
    number_of_asp = models.PositiveIntegerField()
    time_stamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Positions'
    

    def __str__(self):
        return self.position_name

class Aspirant(models.Model):

    passport_picture = models.ImageField(upload_to='aspirant_pictures')
    first_name = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    other_name = models.CharField(max_length=100)
    election = models.ForeignKey(Election, on_delete=models.CASCADE)
    position = models.ForeignKey(Position, on_delete=models.CASCADE)
    ballot_number = models.PositiveIntegerField()
    time_stamp = models.DateTimeField(auto_now_add=True)


    @property
    def full_name(self):
        if self.other_name is not None:
            return f'{self.first_name} {self.other_name} {self.surname}'
        else:
            return f'{self.first_name} {self.surname}'

    class Meta:

        verbose_name_plural = 'Aspirants'

        permissions = [
            ('can_view_aspirants', 'Can view aspirants')
        ]
    
    def __str__(self) -> str:
        return self.full_name


class Vote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    aspirant = models.ForeignKey(Aspirant, on_delete=models.CASCADE)
    election = models.ForeignKey(Election, on_delete=models.CASCADE)
    position = models.ForeignKey(Position, on_delete=models.CASCADE)
    time_stamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        permissions = [
            ('can_view_result', 'Can View Result')
        ]

        verbose_name_plural = 'Votes'
    
    def __str__(self):
        return self.user.first_name + " " + self.aspirant.first_name


class ElectorateProfile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    hall = models.ForeignKey(Hall, on_delete=models.CASCADE)
    polling_station = models.ForeignKey(PollingStation, on_delete=models.CASCADE)
    year_class = models.ForeignKey(YearClass, on_delete=models.CASCADE)

    class Meta:

        verbose_name_plural = 'Electorate Profiles'

        permissions = [
            ('add_electorate', 'Can add electorate'),
            ('delete_electorate', 'Can delete electorate'),
            ('change_electorate', 'Can change electorate'),
            ('view_electorate', 'Can view electorate'),
            ('upload_electorate_with_excel', 'Can upload electorate with excel')
        ]
    
    def __str__(self):
        return self.user.full_name



class VerifiedElectorate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    election = models.ForeignKey(Election, on_delete=models.CASCADE)
    verified_by = models.ForeignKey(User, related_name="VerifiedVoters", on_delete=models.CASCADE)

    class Meta:
        verbose_name_plural = 'Verified Electorates'

        permissions = [
            ('view_verified_electorates', 'Can view verifed electorates'),
            ('unverify_electorates', 'Can unverify electorates')
        ]

    
    def __str__(self) -> str:
        return self.user.full_name