from django.utils.functional import cached_property
from rest_framework import viewsets, mixins
from rest_framework.generics import get_object_or_404
from rest_framework.parsers import FormParser, MultiPartParser

from competition.models import Competition, Submission
from competition.serializers import (
    CompetitionSerializer,
    SubmissionSerializer,
    SubmissionReadOnlySerializer,
)
from competition.services import Scorer
from competition.tasks import hello


class CompetitionViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer


class CompetitionSubmissionViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = SubmissionSerializer

    @cached_property
    def competition(self):
        return get_object_or_404(Competition, pk=self.kwargs["competition_pk"])

    def get_queryset(self):
        return Submission.objects.filter(competition=self.competition)

    def get_serializer_context(self):
        return {"competition": self.competition, **super().get_serializer_context()}

    def perform_create(self, serializer):
        submission = serializer.save()
        # TODO: RunScorer(submission)
        hello.delay()
        sc = Scorer(submission).calculate_submission_result()


class CompetitionBestSubmissionsViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = SubmissionReadOnlySerializer

    @cached_property
    def competition(self):
        return get_object_or_404(Competition, pk=self.kwargs["competition_pk"])

    def get_queryset(self):
        teams = (
            Submission.objects.filter(competition=self.competition)
            .values_list("team", flat=True)
            .distinct()
        )
        highest_scores = [
            Submission.objects.filter(team=team, competition=self.competition)
            .order_by("-score")
            .first()
            for team in teams
        ]
        return sorted(highest_scores, key=lambda x: -x.score)
