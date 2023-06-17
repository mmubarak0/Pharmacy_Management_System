from django.urls import path, re_path
from . import views

urlpatterns = [
    path("funapi", views.jsonfun, name="jsonfun"), 
    # splitting funapi to add. delete. edit urls
    re_path("^(manage/(\w+)?/?(\d+)?/?(-?\w+)?)", views.manage, name="manage"),
    path("tostock", views.tostock, name="tostock"),
]
