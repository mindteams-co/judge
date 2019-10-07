import random
from typing import Callable, Dict

from competition.models import Submission


def example_scorer(csv_in_path: str, correct_csv_path: str):
    return random.uniform(0, 1)


class Scorer:
    COMPETITIONS_SCORERS: Dict[int, Callable[[str, str], float]] = {
        1: example_scorer,
        2: example_scorer,
        3: example_scorer
    }

    def __init__(self, submission: Submission):
        self.submission = submission

    def calculate_submission_result(self):
        return self.COMPETITIONS_SCORERS[self.submission.competition.pk](self.submission.file.path, "")


