from competition.models import Submission
from competition.services import Scorer
from judge.celery import app


@app.task
def calculate_submission(submission_id):
    submission = Submission.objects.get(id=submission_id)
    submission.score = Scorer(submission).calculate_submission_result()
    submission.status = Submission.ACCEPTED
    submission.save()
