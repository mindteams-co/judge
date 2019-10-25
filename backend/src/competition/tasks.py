from celery import chain

from competition.models import Submission
from competition.services import Scorer, SubmissionValidator
from judge.celery import app


@app.task
def validate_submission(submission_id):
    submission = Submission.objects.get(id=submission_id)
    errors = SubmissionValidator(submission.competition.id, submission.file).validate_submission_format()

    if errors:
        submission.status = Submission.INVALID_FORMAT
        submission.save()


@app.task
def calculate_submission(submission_id):
    submission = Submission.objects.get(id=submission_id)

    if submission.status == Submission.PENDING:
        try:
            submission.score = Scorer(submission).calculate_submission_result()
            submission.status = Submission.ACCEPTED
            submission.save()
        except:
            submission.score = None
            submission.status = Submission.INVALID_FORMAT
            submission.save()


@app.task
def validate_and_calculate_submission(submission_id):
    process = chain(
        validate_submission.si(submission_id),
        calculate_submission.si(submission_id),
    )
    process()
