import os
from uuid import uuid4

from django.db import models

from team.models import Team


def csv_directory_path(submission, filename):
    extension = filename.rsplit(".", 1)[-1]

    return f"file-{submission.team.name}/{uuid4()}.{extension}"

def answers_csv_directory_path(competition, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid4()}.{ext}"

    return os.path.join('answers/', filename)


def answers_csv_directory_path(instance, filename):
    extension = filename.rsplit(".", 1)[-1]

    return f"answers/{uuid4()}.{extension}"


class Competition(models.Model):
    PDF = "PDF"
    CSV = "CSV"

    TYPES = (
        (PDF, "pdf"),
        (CSV, "csv")
    )

    name = models.CharField(max_length=64, unique=True)
    type = models.CharField(max_length=3, choices=TYPES)
    answers_csv = models.FileField(upload_to=answers_csv_directory_path, blank=True, null=True)
    weight = models.FloatField(default=1)

    def __str__(self):
        return self.name


class Submission(models.Model):
    ACCEPTED = "ACCEPTED"
    PENDING = "WAITING_FOR_REVIEW"
    INVALID_FORMAT = "INVALID_FORMAT"

    STATUSES = (
        (ACCEPTED, "Accepted"),
        (PENDING, "Waiting for review"),
        (INVALID_FORMAT, "Invalid format"),
    )

    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="submissions")
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE)
    file = models.FileField(upload_to=csv_directory_path, blank=True, null=True)
    score = models.FloatField(null=True)
    status = models.CharField(max_length=18, choices=STATUSES)
    created_at = models.DateTimeField(auto_now_add=True)
    link = models.URLField(max_length=512, null=True, blank=True)

    def __str__(self):
        return f"{self.team}, {self.competition}, {self.score}"

    def get_entries(self):
        return Submission.objects.filter(
            team=self.team, competition=self.competition
        ).count()


class JudgeSubmissionScore(models.Model):
    judge = models.ForeignKey(Team, on_delete=models.CASCADE)
    submission = models.ForeignKey(Submission, on_delete=models.CASCADE)
    score = models.FloatField()

    def __str__(self):
        return f"{self.submission.team} - {self.submission.competition}, score: {self.score}"
