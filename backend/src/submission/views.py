from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from competition.models import Competition, Submission
from competition.serializers import SubmissionSerializer


class SubmissionViewSet(ModelViewSet):
    serializer_class = SubmissionSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Submission.objects.filter(competition__type=Competition.PDF)
