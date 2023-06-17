from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView, LogoutView

class MyLoginView(LoginView):
    template_name = "frontend/registration/login.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["title"] = "Login"
        return context
    

class MyLogoutView(LogoutView):
    template_name = "frontend/registration/logged_out.html"

def index(request):
    context = {"title": "Home"}
    return render(request, "frontend/index.html", context)


@login_required
def stock(request):
    context = {"title": "Stock"}
    return render(request, "frontend/stock.html", context)

@login_required
def patient(request):
    context = {"title": "Patients"}
    return render(request, "frontend/patient.html", context)

@login_required
def users_view(request):
    pass