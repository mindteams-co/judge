from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from competition.models import Competition, Submission, JudgeSubmissionScore
from competition.serializers import SubmissionPdfSerializer, SubmissionJudgeSerializer


class SubmissionViewSet(ModelViewSet):
    serializer_class = SubmissionPdfSerializer
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        if self.action == "list":
            return SubmissionPdfSerializer
        else:
            return SubmissionJudgeSerializer

    def get_queryset(self):
        submissions = Submission.objects.filter(competition__type=Competition.PDF)
        queryset = []
        for submission in submissions:
            if JudgeSubmissionScore.objects.filter(judge=self.request.user.pk, submission=submission).exists():
                continue
            queryset.append(submission)
        return queryset

    def perform_create(self, serializer):
        serializer.save(judge=self.request.user)
