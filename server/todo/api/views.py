import datetime

from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework import authentication, permissions
from rest_framework.views import APIView
import requests
from django.utils.timezone import make_aware
from django.conf import settings


class CustomUserAPIView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class RegisterUserAPIView(APIView):
    def post(self, request):

        # Check request for correct data
        if 'email' not in request.data or 'password' not in request.data:
            return Response({'message': 'Not all fields are filled',
                             'status': 'failure'})

        # Check if user already exist
        find_user_len = len(CustomUser.objects.filter(email=request.data['email']).values())
        if find_user_len == 1:
            return Response({'message': 'User with this email already exist',
                             'status': 'failure'})
        else:
            serializer = CustomUserSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            # last login
            naive_datetime = datetime.datetime.now()
            naive_datetime.tzinfo  # None

            settings.TIME_ZONE  # 'UTC'
            aware_datetime = make_aware(naive_datetime)

            user = CustomUser.objects.create_user(email=request.data['email'], password=request.data['password'],
                                                  last_login=aware_datetime)

            return Response({'message': f'New user {user.email}',
                             'status': 'success'})


class LoginUserAPIView(APIView):
    def post(self, request):
        # Check request for correct data
        if 'email' not in request.data or 'password' not in request.data:
            return Response({'message': 'Not all fields are filled',
                             'status': 'failure'})

        # Check that email exits
        find_user_len = len(CustomUser.objects.filter(email=request.data['email']).values())
        if find_user_len == 0:
            return Response({'message': 'User with this email does not exist',
                             'status': 'failure'})

        user = CustomUser.objects.all().get(email=request.data['email'])

        if user.check_password(request.data['password']):
            return Response({'message': 'Successful authorization',
                             'status': 'success'})
        else:
            return Response({'message': 'Wrong password',
                             'status': 'failure'})
