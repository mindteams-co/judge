from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Populate site with sample submissions."

    def handle(self, *args, **options):
        self.stdout.write("Inside populate_submissions")
