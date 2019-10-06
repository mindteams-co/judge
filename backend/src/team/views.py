from rest_framework import viewsets, mixins

from team.models import Team
from team.serializers import TeamSerializer


class TeamViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()
