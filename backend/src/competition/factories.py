import factory.fuzzy

from competition.models import Competition, Submission
from team.factories import TeamFactory


class CompetitionFactory(factory.DjangoModelFactory):
    class Meta:
        model = Competition

    name = factory.Sequence(lambda n: f"competition_{n}")


class SubmissionFactory(factory.DjangoModelFactory):
    class Meta:
        model = Submission

    competition = factory.SubFactory(CompetitionFactory)
    team = factory.SubFactory(TeamFactory)
    file = factory.django.FileField(filename="submission.csv")
    score = factory.fuzzy.FuzzyFloat(0.0, 1.0)
