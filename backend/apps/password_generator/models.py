from django.db import models
from apps.users.models import CustomUser 
from django.utils import timezone

class PasswordGenerator(models.Model):
    user_ref = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    password = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now)
    edited_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Password for {self.user_ref.username} created at {self.created_at}"
