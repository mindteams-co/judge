import csv
from contextlib import ExitStack
from typing import Callable, Dict

from competition.models import Submission


def example_scorer_1(input_csv_path: str, result_csv_path: str) -> float:
    with ExitStack() as stack:
        result_csv = stack.enter_context(open(result_csv_path, newline=""))
        reader_result = csv.reader(result_csv, delimiter=",")

        input_csv = stack.enter_context(open(input_csv_path, newline=""))
        reader_input = csv.reader(input_csv, delimiter=",")

        match = 0
        for result_row, input_row in zip(reader_result, reader_input):
            if result_row == input_row:
                match += 1

        result = match / reader_result.line_num
        return result


class Scorer:
    COMPETITIONS_SCORERS: Dict[int, Callable[[str, str], float]] = {
        1: example_scorer_1,
    }

    def __init__(self, submission: Submission):
        self.submission = submission

    def calculate_submission_result(self):
        return self.COMPETITIONS_SCORERS[self.submission.competition.pk](self.submission.file.path, "/backend/src/competition/csvs/test1.csv")
