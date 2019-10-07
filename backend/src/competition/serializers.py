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

    def validate(self, attrs):
        # TODO: CSVValidator(CompetitionId, CSVFile)
        # TODO: Max 1 submission na 15 minut
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
