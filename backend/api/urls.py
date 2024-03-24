from django.urls import path
from apps.users.views import *
from apps.password_generator.views import GeneratePasswordView
urlpatterns = [
    path('users/register/',UserRegistrationView.as_view(),name='user-register' ),
    path('users/token/', UserLoginView.as_view(), name='users-login'), 
    path('users/password/create/',GeneratePasswordView.as_view(),name='password-gnerate')
] 