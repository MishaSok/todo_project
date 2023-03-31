import datetime
import time
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

    # VERY IMPORTANT / DO NOT TOUCH
    def __str__(self):
        return self.email


class Folders(models.Model):
    user_id = models.IntegerField()
    folder_name = models.CharField(max_length=150)
    can_be_deleted = models.BooleanField(default=True)


class Tasks(models.Model):
    folder_id = models.IntegerField()
    user_id = models.IntegerField()
    task_text = models.CharField(max_length=150)
    time_today = models.CharField(default='00:00:00', max_length=100)
    time_all = models.CharField(default='00:00:00', max_length=100)

    def __str__(self):
        return [self.folder_id, self.user_id, self.task_text,  self.time_today, self.time_all]

