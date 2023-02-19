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


class CustomUserAPIView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class RegisterUserAPIView(APIView):
    def post(self, request):

        # Check request for correct data
        if 'email' not in request.data or 'password' not in request.data:
            return Response({'message': 'Not all fields are filled'})

        # Check if user already exist
        find_user_len = len(CustomUser.objects.filter(email=request.data['email']).values())
        if find_user_len == 1:
            return Response({'post': 'User with this email already exist'})
        else:
            serializer = CustomUserSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = CustomUser.objects.create_user(email=request.data['email'], password=request.data['password'],
                                                  last_login=datetime.datetime.now())

            return Response({'post': serializer.data})
