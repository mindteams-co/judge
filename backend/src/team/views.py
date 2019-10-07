from django.utils.functional import cached_property
from rest_framework import viewsets, mixins
from rest_framework.generics import get_object_or_404

from competition.models import Submission
from competition.serializers import SubmissionReadOnlySerializer
from team.models import Team
from team.serializers import TeamSerializer


class TeamViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()


class TeamSubmissionsViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = SubmissionReadOnlySerializer

    @cached_property
    def team(self):
        return get_object_or_404(Team, pk=self.kwargs["team_pk"])

    def get_queryset(self):
        return Submission.objects.filter(team=self.team)
