from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from team.factories import TeamFactory
from team.models import Team


class Command(BaseCommand):
    help = "Populate site with sample teams."

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

        for model in [Team]:
            model.objects.all().delete()

        self.stdout.write("Database flush completed successfully.")

    def _run_fixtures(self):
        self.stdout.write("Attempting to load team fixtures...")

        TeamFactory.create(name="AI TEAM 1")
        TeamFactory.create(name="AI TEAM 2")
        TeamFactory.create(name="AI TEAM 3")
        TeamFactory.create(name="AI TEAM 4")

        self.stdout.write("Fixtures loaded successfully.")
