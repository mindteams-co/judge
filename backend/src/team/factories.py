import factory.fuzzy

from team.models import Team


class TeamFactory(factory.DjangoModelFactory):
    class Meta:
        model = Team

    password = "123qweasd"
    name = factory.fuzzy.FuzzyText(length=32)
    email = factory.Faker("safe_email")
