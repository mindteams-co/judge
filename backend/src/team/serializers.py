from rest_framework import serializers

from team.models import Team


class TeamSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = Team
        fields = ["id", "name", "email", "password", "created_at", "is_admin"]
        read_only_fields = ["created_at", "is_admin"]

    def create(self, validated_data):
        return Team.objects.create_team(**validated_data)


class TeamFinalScoreSerializer(serializers.ModelSerializer):

    class Meta:
        model = Team
        fields = ("name", "final_score")
        read_only_fields = ("name", "final_score")
