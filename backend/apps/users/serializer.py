import re
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


User = get_user_model()


class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, value):

        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("Email address must be unique.")

        if not re.match(r"[^@]+@[^@]+\.[^@]+", value):
            raise serializers.ValidationError("Enter a valid email address.")

        if "_" in value:
            raise serializers.ValidationError(
                "Email address must not contain underscores.")

        return value

    def validate_first_name(self, value):

        if not value.isalpha():
            raise serializers.ValidationError(
                "First name must contain only letters.")
        return value

    def create(self, validated_data):

        password = validated_data.pop('password', None)
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.first_name
        return token
