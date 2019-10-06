from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.db import models


class TeamManager(BaseUserManager):
    def create_team(self, email, password=None, **kwargs):
        team = Team(email=email, **kwargs)
        team.set_password(password)
        team.save()

        return team


class Team(AbstractBaseUser):
    email = models.EmailField(unique=True, db_index=True)
    name = models.CharField(max_length=32, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    objects = TeamManager()

    def __str__(self):
        return self.name
