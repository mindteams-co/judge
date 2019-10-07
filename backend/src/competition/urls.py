from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_nested import routers

from competition.views import (
    CompetitionViewSet,
    CompetitionBestSubmissionsViewSet,
    CompetitionSubmissionViewSet,
)

router = SimpleRouter()
router.register("", CompetitionViewSet, basename="competition")

competitions_router = routers.NestedSimpleRouter(router, "", lookup="competition")
competitions_router.register(
    "scores", CompetitionBestSubmissionsViewSet, basename="competition-score"
)
competitions_router.register(
    "submissions", CompetitionSubmissionViewSet, basename="competition-submission"
)

urlpatterns = [
    path("", include(router.urls)),
    path("", include(competitions_router.urls)),
]
