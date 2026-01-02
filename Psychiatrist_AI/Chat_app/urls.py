from django.urls import path
from . import views

urlpatterns = [
    path('do',views.chat),
    path('Chat',views.home),
]