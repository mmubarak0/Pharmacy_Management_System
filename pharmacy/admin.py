from django.contrib import admin
from .models import Patient, Doctor, Prescription, Drug


class PatientAdmin(admin.ModelAdmin):
    list_display = ["username", "first_name", "last_name"]

class DoctorAdmin(admin.ModelAdmin):
    list_display = ["username", "first_name", "last_name"]


class PrescriptionAdmin(admin.ModelAdmin):
    list_display = ["patient", "doctor", "drug", "quantity", "recieved"]
    list_editable = ["recieved"]


class DrugAdmin(admin.ModelAdmin):
    list_display = ['brand_name', 'generic_name', 'price', 'expiry_date', 'quantity']
    search_fields = ['brand_name', 'Stem']


# Register your models here.
admin.site.register(Patient, PatientAdmin)
admin.site.register(Doctor, DoctorAdmin)
admin.site.register(Prescription, PrescriptionAdmin)
admin.site.register(Drug, DrugAdmin)
