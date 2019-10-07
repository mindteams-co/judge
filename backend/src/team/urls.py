from rest_framework.routers import SimpleRouter

from team.views import TeamViewSet

router = SimpleRouter()
router.register("", TeamViewSet, basename="team")


urlpatterns = router.urls
