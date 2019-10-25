from django.utils.functional import cached_property
from rest_framework import viewsets, mixins
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated

from competition.models import Submission
from competition.serializers import TeamSubmissionsReadOnlySerializer
from team.models import Team
from team.serializers import TeamSerializer
from rest_framework.decorators import action
from rest_framework.response import Response


class TeamViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()

    @action(
        methods=["GET"],
        detail=False,
        permission_classes=[IsAuthenticated]
    )
    def me(self, request, **kwargs):
        serializer = self.get_serializer(request.user)

        return Response(serializer.data)


class TeamSubmissionsViewSet(viewsets.ModelViewSet):
    serializer_class = TeamSubmissionsReadOnlySerializer
    permission_classes = (IsAuthenticated,)

    @cached_property
    def team(self):
        return get_object_or_404(Team, pk=self.kwargs["team_pk"])

    def get_queryset(self):
        return Submission.objects.filter(team=self.team).order_by("-created_at")
