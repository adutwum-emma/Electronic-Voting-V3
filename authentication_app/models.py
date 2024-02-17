from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, AbstractUser, UserManager

class UserManager(UserManager):

    def create_user(self, username, email, phone_number, first_name, last_name, other_name=None, password=None, is_active=True, is_staff=False, is_superuser=False):

        if not username:
            raise ValueError('Username is required')
        if not email:
            raise ValueError('Email is required')
        if not phone_number:
            raise ValueError('Phone number is required')
        if password is None:
            raise ValueError('Password is required')
        
        user = self.model(
            email=self.normalize_email(email)
        )
        user.first_name=first_name
        user.last_name=last_name
        user.other_name=other_name
        user.username=username
        user.phone_number=phone_number
        user.active=is_active
        user.staff=is_staff
        user.superuser=is_superuser
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_superuser(self, email, username, phone_number, first_name, last_name, other_name=None, password=None, is_active=True, is_staff=True, is_superuser=True):

        user = self.create_user(
            email=email,
            username=username,
            phone_number=phone_number,
            first_name=first_name,
            last_name=last_name,
            other_name=other_name,
            is_active=is_active,
            is_staff=is_staff,
            is_superuser=is_superuser,
            password=password
        )

        return user
    
    def create_staffuser(self, username, email, phone_number, first_name, last_name, other_name=None, password=None, is_active=True, is_superuser=False, is_staff=True):

        user = self.create_user(
            username=username,
            email=email,
            phone_number=phone_number,
            first_name=first_name,
            last_name=last_name,
            other_name=other_name,
            password=password,
            is_active=is_active,
            is_staff=is_staff,
            is_superuser=is_superuser
        )

        return user

class User(AbstractUser):

    username = models.CharField(max_length=200, unique=True)
    email = models.EmailField()
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    other_name = models.CharField(max_length=100, null=True, blank=True)
    phone_number = models.CharField(max_length=15, unique=True)
    active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)
    superuser = models.BooleanField(default=False)
    time_stamp = models.DateTimeField(auto_now_add=True)


    @property
    def full_name(self):
        if self.other_name is not None:
            return f'{self.first_name} {self.other_name} {self.last_name}'
        else:
            return f'{self.first_name} {self.last_name}'
    
    @property
    def user_type(self):
        if self.staff and not self.superuser:
            return 'staff'
        elif self.staff and self.superuser:
            return 'superuser'
        else:
            return 'user'

    USERNAME_FIELD = 'username'

    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'phone_number']

    
    class Meta:

        permissions = [
            ('view_users', 'Can view users'),
            ('assign_group', 'Can assign group to users'),
            ('assign_permission', 'Can assign permission to users'),
            ('view_dashboard', 'Can view dashboard')
        ]

        verbose_name_plural = 'Users'

    objects = UserManager()

    @property
    def is_active(self):
        return self.active
    
    @property
    def is_staff(self):
        return self.staff
    
    @property
    def is_superuser(self):
        return self.superuser