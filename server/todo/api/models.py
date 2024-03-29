import datetime

from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from .managers import CustomUserManager


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    def __str__(self):
        return self.email


class Tasks(models.Model):
    email = models.CharField(unique=False, max_length=150)
    folder_name = models.CharField(unique=False, max_length=30)
    task_text = models.CharField(unique=False, max_length=100, default='None')
    created_time = models.DateTimeField(default=timezone.now)
    time_today = models.DateTimeField(default=datetime.datetime(2000, 1, 1))
    time_all = models.DateTimeField(default=datetime.datetime(2000, 1, 1))

    def __str__(self):
        return f'User: {self.email} Task_folder: {self.folder_name} Task_text:{self.task_text}'
