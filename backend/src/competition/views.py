from django.utils.functional import cached_property
from rest_framework import viewsets, mixins
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from competition.models import Competition, Submission
from competition.serializers import (
    CompetitionSerializer,
    SubmissionSerializer,
    SubmissionReadOnlySerializer,
)
from competition.services import SubmissionValidator
from competition.tasks import validate_and_calculate_submission


class CompetitionViewSet(ModelViewSet):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer


class CompetitionSubmissionViewSet(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = SubmissionSerializer
    permission_classes = (IsAuthenticated,)

    @cached_property
    def competition(self):
        return get_object_or_404(Competition, pk=self.kwargs["competition_pk"])

    def get_queryset(self):
        return Submission.objects.filter(competition=self.competition)

    def get_serializer_context(self):
        return {"competition": self.competition, **super().get_serializer_context()}

    def perform_create(self, serializer):
        submission = serializer.save()
        if self.competition.type == Competition.CSV:
            validate_and_calculate_submission.delay(submission.id)


class CompetitionBestSubmissionsViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = SubmissionReadOnlySerializer

    @cached_property
    def competition(self):
        return get_object_or_404(Competition, pk=self.kwargs["competition_pk"])

    def get_queryset(self):
        # TODO: Move to custom queryset
        teams = (
            Submission.objects.filter(competition=self.competition, score__isnull=False)
            .values_list("team", flat=True)
            .distinct()
        )
        highest_scores = [
            Submission.objects.filter(team=team, competition=self.competition, score__isnull=False)
            .order_by("-score")
            .first()
            for team in teams
        ]
        return sorted(highest_scores, key=lambda x: -x.score)
