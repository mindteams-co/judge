from django.urls import reverse
from rest_framework import test, status

from competition.factories import CompetitionFactory, SubmissionFactory
from team.factories import TeamFactory


class CompetitionTestCase(test.APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.competitions_url = reverse("competition-list")
        CompetitionFactory.create()

    def test_get_all_available_competitions(self):
        response = self.client.get(self.competitions_url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class SubmissionTestCase(test.APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.competition = CompetitionFactory()
        cls.team = TeamFactory()
        cls.submission = SubmissionFactory(
            competition=cls.competition, team=cls.team, file__data=b"CSV FILE"
        )
        cls.post_submission_url = reverse(
            "competition-submission-list", kwargs={"competition_pk": cls.competition.pk}
        )

    def test_sending_submission_for_a_competition(self):
        with open(self.submission.file.path, "rb") as file:
            post_data = {"team": self.team.pk, "file": file}
            response = self.client.post(self.post_submission_url, data=post_data)

            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_only_team_member_can_send_a_submission(self):
        ...


class CompetitionBestSubmissionsTestCase(test.APITestCase):
    @classmethod
    def setUpTestData(cls):
        ...

    def test_get_all_the_best_submissions_for_a_competition(self):
        ...
