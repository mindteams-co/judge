from uuid import uuid4

from django.db import models

from team.models import Team


def csv_directory_path(submission, filename):
    extension = filename.rsplit(".", 1)[-1]

    return f"file-{submission.team.name}/{uuid4()}.{extension}"


class Competition(models.Model):
    PDF = "PDF"
    CSV = "CSV"

    TYPES = (
        (PDF, "pdf"),
        (CSV, "csv")
    )

    name = models.CharField(max_length=64, unique=True)
    type = models.CharField(max_length=3, choices=TYPES)

    def __str__(self):
        return self.name


class Submission(models.Model):
    ACCEPTED = "ACCEPTED"
    PENDING = "PENDING"
    INVALID_FORMAT = "INVALID_FORMAT"

    STATUSES = (
        (ACCEPTED, "Accepted"),
        (PENDING, "Pending"),
        (INVALID_FORMAT, "Invalid format"),
    )

    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE)
    file = models.FileField(upload_to=csv_directory_path)
    score = models.FloatField(null=True)
    status = models.CharField(max_length=14, choices=STATUSES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.team}, {self.competition}, {self.score}"

    def get_entries(self):
        return Submission.objects.filter(
            team=self.team, competition=self.competition
        ).count()


class JudgeSubmissionScore(models.Model):
    judge = models.ForeignKey(Team, on_delete=models.CASCADE)
    competition = models.ForeignKey(Submission, on_delete=models.CASCADE)
    score = models.FloatField()
