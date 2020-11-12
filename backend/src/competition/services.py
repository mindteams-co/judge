import csv
from contextlib import ExitStack
from typing import Callable, Dict, Type

from csvvalidator import *
from django.db.models import FileField

from competition.models import Submission, Competition
from judge.scorer2020 import score


def example_scorer_1(input_csv_path: str, result_csv_path: str) -> float:
    with ExitStack() as stack:
        result_csv = stack.enter_context(open(result_csv_path, newline=""))
        reader_result = csv.reader(result_csv, delimiter=";")

        input_csv = stack.enter_context(open(input_csv_path, newline=""))
        reader_input = csv.reader(input_csv, delimiter=";")

        match = 0
        for result_row, input_row in zip(reader_result, reader_input):
            if result_row == input_row:
                match += 1

        result = match / reader_result.line_num
        return result


class Scorer:

    def __init__(self, submission: Submission):
        self.submission = submission

    def calculate_submission_result(self):
        return score(self.submission.file.path, self.submission.competition.answers_csv.path)

field_names_1 = ('Name', 'Amusement park','Animals','Bench','Building','Castle','Cave','Church','City','Cross','Cultural institution',
                 'Food','Footpath','Forest','Furniture','Grass','Graveyard','Lake','Landscape','Mine','Monument','Motor vehicle',
                 'Mountains','Museum','Open-air museum','Park','Person','Plants','Reservoir','River','Road','Rocks','Snow','Sport',
                 'Sports facility','Stairs','Trees','Watercraft','Windows')

example_validator_1 = CSVValidator(field_names_1)
example_validator_1.add_value_check('Name', str)
example_validator_1.add_value_check('Amusement park', int)
example_validator_1.add_value_check('Animals', int)
example_validator_1.add_value_check('Bench', int)
example_validator_1.add_value_check('Building', int)
example_validator_1.add_value_check('Castle', int)
example_validator_1.add_value_check('Cave', int)
example_validator_1.add_value_check('Church', int)
example_validator_1.add_value_check('City', int)
example_validator_1.add_value_check('Cross', int)
example_validator_1.add_value_check('Cultural institution', int)
example_validator_1.add_value_check('Food', int)
example_validator_1.add_value_check('Footpath', int)
example_validator_1.add_value_check('Forest', int)
example_validator_1.add_value_check('Furniture', int)
example_validator_1.add_value_check('Grass', int)
example_validator_1.add_value_check('Graveyard', int)
example_validator_1.add_value_check('Lake', int)
example_validator_1.add_value_check('Landscape', int)
example_validator_1.add_value_check('Mine', int)
example_validator_1.add_value_check('Monument', int)
example_validator_1.add_value_check('Motor vehicle', int)
example_validator_1.add_value_check('Mountains', int)
example_validator_1.add_value_check('Museum', int)
example_validator_1.add_value_check('Open-air museum', int)
example_validator_1.add_value_check('Park', int)
example_validator_1.add_value_check('Person', int)
example_validator_1.add_value_check('Plants', int)
example_validator_1.add_value_check('Reservoir', int)
example_validator_1.add_value_check('River', int)
example_validator_1.add_value_check('Road', int)
example_validator_1.add_value_check('Rocks', int)
example_validator_1.add_value_check('Snow', int)
example_validator_1.add_value_check('Sport', int)
example_validator_1.add_value_check('Sports facility', int)
example_validator_1.add_value_check('Stairs', int)
example_validator_1.add_value_check('Trees', int)
example_validator_1.add_value_check('Watercraft', int)
example_validator_1.add_value_check('Windows', int)


class SubmissionValidator:

    def __init__(self, competition_id: int, submission_file: Type[FileField]):
        self.competition = Competition.objects.get(id=competition_id)
        self.submission_file = submission_file

    def validate_submission_format(self):
        with open(self.submission_file.path, newline="") as reader:
            data = csv.reader(reader, delimiter=',')
            return example_validator_1.validate(data)
