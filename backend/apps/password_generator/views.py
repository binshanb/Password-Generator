from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from django.utils.crypto import get_random_string
from .models import PasswordGenerator
from .serializers import GeneratedPasswordSerializer
class GeneratePasswordView(APIView):
     permission_classes = [permissions.IsAuthenticated]
     
     def post(self, request, *args, **kwargs):
        lower_case = request.data.get('lower', False)
        upper_case = request.data.get('upper', False)
        numbers = request.data.get('numbers', False)
        special = request.data.get('special', False)
        password_length = int(request.data.get('passwordLength', 4))
        print(f'lower:{lower_case},upper:{upper_case},numbers:{numbers},special:{special}')
        character_set = ''
        if lower_case:
            character_set += 'abcdefghijklmnopqrstuvwxyz'
        if upper_case:
            character_set += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        if numbers:
            character_set += '0123456789'
        if special:
            character_set += '!@#$%^&*()_+[]{}|;:,.<>?'
        if not character_set:
            return Response({'error': 'Select at least one character set for password generation.'}, status=status.HTTP_400_BAD_REQUEST)

        generated_password = get_random_string(password_length, character_set)
        user = request.user
        password_instance = PasswordGenerator(password=generated_password,user_ref=user)
        password_instance.save()

        serializer = GeneratedPasswordSerializer(data={'password': generated_password,'user_ref':user.id})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
