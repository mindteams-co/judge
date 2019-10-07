from django.urls import path, include
from rest_framework_jwt.views import (
    obtain_jwt_token,
    verify_jwt_token,
    refresh_jwt_token,
)


urlpatterns = [
    path("", include("rest_framework.urls", namespace="rest_framework")),
    path("obtain-token/", obtain_jwt_token),
    path("verify-token/", verify_jwt_token),
    path("refresh-token/", refresh_jwt_token),
    path("competitions/", include("competition.urls")),
    path("teams/", include("team.urls")),
]
