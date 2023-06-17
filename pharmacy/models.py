from typing import Iterable, Optional
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import User, Group


class Patient(User):
    middle_name = models.CharField(null=True, blank=True, max_length=200)
    current_status = models.TextField(null=True, blank=True)
    image = models.ImageField(
        upload_to="frontend/static/img/patients/", null=True, blank=True
    )
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.first_name


class Doctor(User):
    middle_name = models.CharField(null=True, blank=True, max_length=200)

    def __str__(self):
        return self.first_name


class Drug(models.Model):
    brand_name = models.CharField(max_length=200, blank=True, null=True)
    generic_name = models.CharField(max_length=200, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)
    expiry_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    quantity = models.IntegerField(blank=True, null=True)
    image = models.ImageField(
        upload_to="frontend/static/img/drugs/", null=True, blank=True
    )
    date_created = models.DateTimeField(auto_now_add=True)
    last_modfied = models.DateTimeField(auto_now=True)

    def has_expired(self):
        time_now = timezone.now()
        return time_now < self.expiary_date

    def in_stock(self, quantity):
        return self.quantity > 0 and self.quantity >= quantity

    def __str__(self):
        return f"{self.brand_name}"


class Prescription(models.Model):
    patient = models.ForeignKey(
        Patient, on_delete=models.CASCADE, related_name="Patient"
    )
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="Doctor")
    drug = models.ForeignKey(Drug, on_delete=models.CASCADE, related_name="Drug")
    date = models.DateTimeField(auto_now=True)
    quantity = models.IntegerField()
    recieved = models.BooleanField(default=False)
    notes = models.TextField()

    def delivered(self):
        return self.recieved

    def __str__(self):
        return f"Prescription To {self.patient.first_name}"
