from django.urls import path, include
from rest_framework.routers import SimpleRouter

from submission.views import SubmissionViewSet

router = SimpleRouter()
router.register("", SubmissionViewSet, basename="competition")


urlpatterns = [
    path("", include(router.urls)),
]
