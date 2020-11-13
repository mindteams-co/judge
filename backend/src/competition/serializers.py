from datetime import timedelta

from django.db import transaction
from django.utils import timezone
from rest_framework import serializers

from competition.models import Competition, Submission, JudgeSubmissionScore
from team.serializers import TeamSerializer


class CompetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competition
        fields = ["id", "name", "type"]


class SubmissionPdfSerializer(serializers.ModelSerializer):
    team = TeamSerializer()

    class Meta:
        model = Submission
        fields = ["id", "team", "file", "created_at"]


class SubmissionJudgeSerializer(serializers.ModelSerializer):
    judge = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = JudgeSubmissionScore
        fields = ["judge", "submission", "score"]

    @transaction.atomic
    def create(self, validated_data):
        submission = validated_data["submission"]

        if JudgeSubmissionScore.objects.filter(submission=submission).count() >= 2:
            submission.status = Submission.ACCEPTED

            judge_submissions = JudgeSubmissionScore.objects.filter(submission=submission).order_by("-score")

            sum_score = sum([submission.score for submission in judge_submissions]) + validated_data["score"]
            submission.score = sum_score / (len(judge_submissions) + 1)


        submission.save()

        return super(SubmissionJudgeSerializer, self).create(validated_data)


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = ["id", "team", "file"]

    default_error_messages = {
        "one_submission_every_15_minutes": "You can send one submission every 15 minutes."
    }

    def validate(self, attrs):
        last_submission = Submission.objects.filter(team=attrs['team'], competition=self.context["competition"]).order_by("-created_at").first()
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


class JudgeSubmissionScoreSerializer(serializers.ModelSerializer):
    judge  = TeamSerializer()

    class Meta:
        model = JudgeSubmissionScore
        fields = ["judge", "score"]


class TeamSubmissionsReadOnlySerializer(serializers.ModelSerializer):
    competition = CompetitionSerializer()
    judgesubmissionscore_set = JudgeSubmissionScoreSerializer(many=True, read_only=True)

    class Meta:
        model = Submission
        fields = ["id", "score", "competition", "file", "created_at", "status", "judgesubmissionscore_set"]
        read_only_fields = fields
