from rest_framework import serializers

from team.models import Team


class TeamSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)

    class Meta:
        model = Team
        fields = ["id", "name", "email", "password", "created_at"]
        read_only_fields = ["created_at"]

    def create(self, validated_data):
        return Team.objects.create_team(**validated_data)
