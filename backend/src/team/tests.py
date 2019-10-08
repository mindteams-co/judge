import factory
from django.urls import reverse
from rest_framework import test, status

from competition.factories import CompetitionFactory, SubmissionFactory
from team.factories import TeamFactory
from team.models import Team


class TestTeamRegistration(test.APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.team_register_url = reverse("team-list")

    def setUp(self):
        self.registration_data = factory.build(dict, FACTORY_CLASS=TeamFactory)

    def test_register_team_with_email_and_password(self):
        response = self.client.post(self.team_register_url, data=self.registration_data)

        self.assertEqual(status.HTTP_201_CREATED, response.status_code)
        self.assertTrue(
            Team.objects.filter(email=self.registration_data["email"]).exists()
        )

    def test_register_team_with_team_name_longer_than_32_chars(self):
        self.registration_data["name"] = "".join("a" for _ in range(33))
        response = self.client.post(self.team_register_url, data=self.registration_data)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class TestTeamSubmissions(test.APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.team = TeamFactory()
        cls.team_submissions_url = reverse("team-submission-list", args=[cls.team.pk])
        SubmissionFactory.create(team=cls.team)

    def test_team_member_gets_team_submissions(self):
        response = self.client.get(self.team_submissions_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_only_team_member_can_get_team_submissions(self):
        ...
