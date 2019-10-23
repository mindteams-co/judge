from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.db import models


class TeamManager(BaseUserManager):
    def create_team(self, email, password=None, **kwargs):
        team = Team(email=email, **kwargs)
        team.set_password(password)
        team.save()

        return team

    def create_superuser(self, email, name, password):
        team = self.create_team(
            email,
            name=name,
            password=password
        )
        team.is_admin = True
        team.save(using=self._db)
        return team


class Team(AbstractBaseUser):
    email = models.EmailField(unique=True, db_index=True)
    name = models.CharField(max_length=32, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)


    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    objects = TeamManager()

    def __str__(self):
        return self.name

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin
