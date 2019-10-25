from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from competition.models import Competition
from team.models import Team


class Command(BaseCommand):
    help = "Populate site with sample competitions."

    def add_arguments(self, parser):
        parser.add_argument(
            '--clean',
            help='Wipe existing data from the database before loading fixtures.',
            action='store_true',
            default=False,
        )

    def handle(self, *args, **options):
        try:
            with transaction.atomic():
                if options['clean']:
                    self._clean_db()

                self._run_fixtures()

        except Exception as e:
            raise CommandError(f"{e}\n\nTransaction was not committed due to the above exception.")

    def _clean_db(self):
        self.stdout.write("Flushing database...")

        for model in [Competition]:
            model.objects.all().delete()

        self.stdout.write("Database flush completed successfully.")

    def _run_fixtures(self):
        self.stdout.write("Attempting to load competitions fixtures...")

        Competition.objects.bulk_create([
            Competition(name="MAIN TASK", type=Competition.CSV),
            Competition(name="BONUS TASK", type=Competition.PDF),
        ])

        self.stdout.write("Fixtures loaded successfully.")
