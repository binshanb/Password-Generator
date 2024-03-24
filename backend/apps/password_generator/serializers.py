from rest_framework import serializers
from .models import PasswordGenerator

class GeneratedPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model=PasswordGenerator
        fields = ['password','user_ref']