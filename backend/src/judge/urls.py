from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_jwt.views import (
    obtain_jwt_token,
    refresh_jwt_token,
    verify_jwt_token,
)
from rest_framework_nested import routers

from competition.views import CompetitionViewSet, SubmissionViewSet, CompetitionScoresViewSet
from team.views import TeamViewSet

router = SimpleRouter()
router.register("teams", TeamViewSet, basename="team")
router.register("competitions", CompetitionViewSet, basename="competition")
router.register("submissions", SubmissionViewSet, basename="submission")

competition_score_router = routers.NestedSimpleRouter(router, "competitions", lookup="competition")
competition_score_router.register("scores", CompetitionScoresViewSet, basename="competition-score")


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("api/", include(competition_score_router.urls)),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("api/obtain-token/", obtain_jwt_token, name="obtain-token"),
    path("api/refresh-token/", refresh_jwt_token, name="refresh-token"),
    path("api/verify-token/", verify_jwt_token, name="verify-token"),
]
