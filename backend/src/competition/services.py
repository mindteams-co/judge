import csv
from contextlib import ExitStack
from typing import Callable, Dict, Type

from csvvalidator import *
from django.db.models import FileField

from competition.models import Submission, Competition
from judge.ingscorer import score


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
    COMPETITIONS_SCORERS: Dict[int, Callable[[str, str], float]] = {
        1: score
    }

    def __init__(self, submission: Submission):
        self.submission = submission

    def calculate_submission_result(self):
        return self.COMPETITIONS_SCORERS[self.submission.competition.pk](self.submission.file.path, "/backend/src/competition/csvs/output_answers.csv")


field_names_1 = ('filename','standard','task2_class','tech_cond','Bathroom','Bathroom cabinet','Bathroom sink','Bathtub','Bed','Bed frame','Bed sheet','Bedroom','Cabinetry','Ceiling','Chair','Chandelier',
                 'Chest of drawers','Coffee table','Couch','Countertop','Cupboard','Curtain','Dining room','Door','Drawer','Facade','Fireplace','Floor','Furniture','Grass','Hardwood','House','Kitchen','Kitchen & dining room table',
                 'Kitchen stove','Living room','Mattress','Nightstand','Plumbing fixture','Property','Real estate','Refrigerator',
                 'Roof','Room','Rural area','Shower','Sink','Sky','Table','Tablecloth','Tap','Tile','Toilet','Tree','Urban area','Wall','Window')

example_validator_1 = CSVValidator(field_names_1)
example_validator_1.add_value_check('filename', str)
example_validator_1.add_value_check('standard', int)
example_validator_1.add_value_check('task2_class', str)
example_validator_1.add_value_check('tech_cond', int)
example_validator_1.add_value_check('Bathroom', int)
example_validator_1.add_value_check('Bathroom cabinet', int)
example_validator_1.add_value_check('Bathroom sink', int)
example_validator_1.add_value_check('Bathtub', int)
example_validator_1.add_value_check('Bed', int)
example_validator_1.add_value_check('Bed frame', int)
example_validator_1.add_value_check('Bed sheet', int)
example_validator_1.add_value_check('Bedroom', int)
example_validator_1.add_value_check('Cabinetry', int)
example_validator_1.add_value_check('Ceiling', int)
example_validator_1.add_value_check('Chair', int)
example_validator_1.add_value_check('Chandelier', int)
example_validator_1.add_value_check('Chest of drawers', int)
example_validator_1.add_value_check('Coffee table', int)
example_validator_1.add_value_check('Couch', int)
example_validator_1.add_value_check('Cupboard', int)
example_validator_1.add_value_check('Curtain', int)
example_validator_1.add_value_check('Dining room', int)
example_validator_1.add_value_check('Door', int)
example_validator_1.add_value_check('Drawer', int)
example_validator_1.add_value_check('Facade', int)
example_validator_1.add_value_check('Fireplace', int)
example_validator_1.add_value_check('Floor', int)
example_validator_1.add_value_check('Furniture', int)
example_validator_1.add_value_check('Grass', int)
example_validator_1.add_value_check('Hardwood', int)
example_validator_1.add_value_check('House', int)
example_validator_1.add_value_check('Kitchen', int)
example_validator_1.add_value_check('Kitchen & dining room table', int)
example_validator_1.add_value_check('Kitchen stove', int)
example_validator_1.add_value_check('Living room', int)
example_validator_1.add_value_check('Mattress', int)
example_validator_1.add_value_check('Nightstand', int)
example_validator_1.add_value_check('Plumbing fixture', int)
example_validator_1.add_value_check('Property', int)
example_validator_1.add_value_check('Real estate', int)
example_validator_1.add_value_check('Refrigerator', int)
example_validator_1.add_value_check('Roof', int)
example_validator_1.add_value_check('Room', int)
example_validator_1.add_value_check('Rural area', int)
example_validator_1.add_value_check('Shower', int)
example_validator_1.add_value_check('Sink', int)
example_validator_1.add_value_check('Sky', int)
example_validator_1.add_value_check('Table', int)
example_validator_1.add_value_check('Tablecloth', int)
example_validator_1.add_value_check('Tap', int)
example_validator_1.add_value_check('Toilet', int)
example_validator_1.add_value_check('Tree', int)
example_validator_1.add_value_check('Urban area', int)
example_validator_1.add_value_check('Wall', int)
example_validator_1.add_value_check('Window', int)


class SubmissionValidator:
    COMPETITION_VALIDATORS = {
        1: example_validator_1
    }

    def __init__(self, competition_id: int, submission_file: Type[FileField]):
        self.competition = Competition.objects.get(id=competition_id)
        self.submission_file = submission_file

    def validate_submission_format(self):
        with open(self.submission_file.path, newline="") as reader:
            data = csv.reader(reader, delimiter=';')
            return self.COMPETITION_VALIDATORS[self.competition.pk].validate(data)
