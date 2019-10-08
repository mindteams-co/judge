from django.core.management import call_command


def run():
    call_command("populate_teams")
    call_command("populate_competitions")
