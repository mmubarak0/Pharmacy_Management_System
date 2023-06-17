from django.urls import path
from . import views

app_name = "frontend"
urlpatterns = [
    path("", views.index, name="index"),
    path("stock", views.stock, name="stock"),
    path("patient", views.patient, name="patient"),
    path("accounts/users", views.users_view, name="users_view"),
    path("accounts/login", views.MyLoginView.as_view(), name="login_view"),
    path("accounts/logout", views.MyLogoutView.as_view(), name="logout_view"),
    path("accounts/profile/", views.index),
]
