from django.urls import path, include

urlpatterns = [path("api/", include("judge.api_urls"))]
