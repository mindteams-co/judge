from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path


class ScoresConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add(
            "ScoresGroup",
            self.channel_name,
        )

    async def notify(self, event):
        await self.send_json(event["content"])


websockets = URLRouter([
    path(
        "ws/scores",
        ScoresConsumer,
        name="ws_notifications",
    ),
])


application = ProtocolTypeRouter({
    # (http->django views is added by default)
    "websocket": websockets,
})
