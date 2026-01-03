from django.urls import path
from . import views

urlpatterns = [
    path('ai',views.chat),
    path('test',views.test),
]