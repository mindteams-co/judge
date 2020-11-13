from django.urls import path, include
from rest_framework.routers import SimpleRouter
from rest_framework_nested import routers

from team.views import TeamViewSet, TeamSubmissionsViewSet, TeamFinalScoreViewSet

router = SimpleRouter()
router.register("", TeamViewSet, basename="team")
router.register("final-scores", TeamFinalScoreViewSet, basename="team-final-score")

teams_router = routers.NestedSimpleRouter(router, "", lookup="team")
teams_router.register("submissions", TeamSubmissionsViewSet, basename="team-submission")

urlpatterns = [path("", include(router.urls)), path("", include(teams_router.urls))]
