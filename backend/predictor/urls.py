from django.urls import path
from .views import predict_view, ai_summary_view

urlpatterns = [
    path("predict/", predict_view),
    path("ai-summary/", ai_summary_view),
]
