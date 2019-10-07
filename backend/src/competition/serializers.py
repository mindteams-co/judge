from rest_framework import serializers

from competition.models import Competition, Submission
from team.serializers import TeamSerializer


class CompetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competition
        fields = ["id", "name"]


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ["id", "team", "file"]

    def create(self, validated_data):
        submission = Submission.objects.create(
            competition=self.context["competition"],
            status=Submission.PENDING,
            **validated_data
        )
        # check_format(Submission) If not csv -> Status rejected and return submission else: celery_process(submission) and return submission
        return submission


class SubmissionScoreSerializer(serializers.ModelSerializer):
    team = TeamSerializer()
    entries = serializers.ReadOnlyField(source="get_entries")

    class Meta:
        model = Submission
        fields = ["id", "team", "score", "created_at", "entries"]
        read_only_fields = fields
