import datetime
import json
import django.db.models
from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import CustomUser, Tasks, Folders
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

            # Find user_id
            try:
                user_id = CustomUser.objects.all().filter(email=request.data['email']).values()[0]
            except Exception as user_id_error:
                print(user_id_error)

                return Response({'message': 'An unexpected error has occurred. Try again',
                                 'status': 'failure'})
            user_id = user_id['id']
            self.default_folders(user_id)
            return Response({'message': f'New user {user.email}',
                             'status': 'success',
                             'user_id': user_id})

    @staticmethod
    def default_folders(user_id):
        try:
            print(user_id)
            archive_default_folder = Folders(user_id=user_id, folder_name='Архив', can_be_deleted=False)
            main_default_folder = Folders(user_id=user_id, folder_name='Основные задачи', can_be_deleted=False)
            archive_default_folder.save()
            print('123')
            main_default_folder.save()
        except Exception as Error:
            return Response({'message': 'An unexpected error has occurred. Try again',
                             'status': 'failure'})


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

        # Find user_id
        try:
            user_id = CustomUser.objects.all().get(email=request.data['email'])
        except Exception as user_id_error:
            print(user_id_error)
        if user.check_password(request.data['password']):
            return Response({'message': 'Successful authorization',
                             'status': 'success',
                             'user_id': user_id.id})
        else:
            return Response({'message': 'Wrong password',
                             'status': 'failure'})


class FolderView(APIView):
    def post(self, request):
        # Check if folder exist
        if self.check_folder_exist(request.data['user_id'], request.data['folder_name']):
            return Response({'message': 'Folder already exist',
                             'status': 'failure'})
        # Create new folder
        folder = Folders(user_id=request.data['user_id'], folder_name=request.data['folder_name'],
                         can_be_deleted=True).save()
        folder_id = \
        Folders.objects.filter(user_id=request.data['user_id'], folder_name=request.data['folder_name']).values()[0]
        return Response({'message': "New folder created",
                         'folderId': folder_id['id'],
                         'canBeDeleted': folder_id['can_be_deleted'],
                         'status': 'success'})

    def delete(self, request):
        # Delete folder
        folder = Folders.objects.filter(user_id=request.data['user_id'], id=request.data['folder_id']).delete()
        return Response({'message': 'Folder have been deleted',
                         'status': 'success'})

    @staticmethod
    def check_folder_exist(user_id, folder_name):
        print('123')
        folders_list = list(Folders.objects.filter(user_id=user_id, folder_name=folder_name).values())
        if len(folders_list) >= 1:
            return True
        else:
            return False
