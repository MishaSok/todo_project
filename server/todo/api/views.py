import datetime

from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import CustomUser, Tasks
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
                user_id = CustomUser.objects.all().get(email=request.data['email'])
            except Exception as user_id_error:
                print(user_id_error)

                return Response({'message': 'An unexpected error has occurred. Try again',
                                 'status': 'failure'})
            self.default_folders(email=request.data['email'])
            return Response({'message': f'New user {user.email}',
                             'status': 'success',
                             'user_id': user_id.id})

    @staticmethod
    def default_folders(email):
        try:
            archive_default_folder = Tasks(email=email, folder_name='Archive',
                                           task_text='service_task')
            main_tasks_default_folder = Tasks(email=email, folder_name='Main Tasks',
                                              task_text='service_task')
            archive_default_folder.save()
            main_tasks_default_folder.save()
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


class CreateFolderView(APIView):
    def post(self, request):
        # check request for correct data
        if 'email' not in request.data or 'folder_name' not in request.data:
            return Response({'message': 'Not all fields are filled',
                             'status': 'failure'})
        try:
            folder = Tasks(email=request.data['email'], folder_name=request.data['folder_name'],
                           task_text='service_task')
            folder.save()
            return Response({'message': 'Successfully',
                             'status': 'success'})
        except Exception as FolderError:
            print(FolderError)
            return Response({'message': 'An unexpected error has occurred. Try again',
                             'status': 'failure'})


class RemoveFolderView(APIView):
    def post(self, request):
        if 'email' not in request.data or 'folder_name' not in request.data:
            return Response({'message': 'Not all fields are filled',
                             'status': 'failure'})
        try:
            tasks = Tasks.objects.filter(email=request.data['email'],
                                         folder_name=request.data['folder_name']).delete()
            return Response({'message': 'Folder deleted successfully'})
        except Exception as FolderRemoveError:
            print(FolderRemoveError)
            return Response({'message': 'An unexpected error has occurred. Try again',
                             'status': 'failure'})


class MainMenuView(APIView):
    def get(self, request, pk):
        try:
            data = []
            folder_id = 1
            for folder_name in self.get_all_folders(pk):
                data.append({
                    'id': folder_id,
                    'folderName': folder_name, })
                folder_id += 1
            # ADD TASKS FROM MAIN FOLDER TO JSON RESPONSE
            print(self.get_all_default_tasks(pk))
            return Response(data)
        except Exception as MainMenu:
            print(MainMenu)
            return Response({'message': 'An unexpected error has occurred. Try again',
                             'status': 'failure'})

    @staticmethod
    def get_all_folders(pk):
        user = CustomUser.objects.all().get(pk=pk)
        user_email = str(user)
        folders = Tasks.objects.filter(email=user_email).values()
        return [i['folder_name'] for i in folders]

    @staticmethod
    def get_all_default_tasks(pk):
        user = CustomUser.objects.all().get(pk=pk)
        user_email = str(user)
        tasks = Tasks.objects.filter(email=user_email, folder_name='Main Tasks').values()
        return [task['task_text'] for task in tasks if task['task_text'] != 'service_task']
