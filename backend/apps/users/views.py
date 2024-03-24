from django.shortcuts import render
from rest_framework import generics, status
from rest_framework_simplejwt.views import TokenObtainPairView


from apps.users.models import CustomUser
from .serializer import CustomTokenObtainPairSerializer, RegistrationSerializer


class UserRegistrationView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegistrationSerializer


class UserLoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
