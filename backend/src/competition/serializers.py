from datetime import timedelta

from django.utils import timezone
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

    default_error_messages = {
        "one_submission_every_15_minutes": "You can send one submission every 15 minutes."
    }

    def validate(self, attrs):
        last_submission = Submission.objects.filter(team=attrs['team']).order_by("-created_at").first()
        if last_submission:
            if timezone.now() - timedelta(minutes=15) < last_submission.created_at:
                self.fail("one_submission_every_15_minutes")

        return super().validate(attrs)

    def create(self, validated_data):
        submission = Submission.objects.create(
            competition=self.context["competition"],
            status=Submission.PENDING,
            **validated_data
        )
        return submission


class SubmissionReadOnlySerializer(serializers.ModelSerializer):
    team = TeamSerializer()
    entries = serializers.ReadOnlyField(source="get_entries")

    class Meta:
        model = Submission
        fields = ["id", "team", "score", "created_at", "entries"]
        read_only_fields = fields


class TeamSubmissionsReadOnlySerializer(serializers.ModelSerializer):
    competition = CompetitionSerializer()

    class Meta:
        model = Submission
        fields = ["id", "score", "competition", "file", "created_at", "status"]
        read_only_fields = fields
