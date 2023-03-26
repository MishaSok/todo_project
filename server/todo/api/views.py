import datetime
import json
import django.db.models
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


class FolderView(APIView):
    def post(self, request):
        try:
            if not self.check_request(request):
                return Response({'message': 'Not all fields are filled',
                                 'status': 'failure'})
            user_id = request.data['user_id']
            folder_name = request.data['folder_name']
            user_email = self.get_user_email(user_id)
            folder = Tasks(email=user_email, folder_name=folder_name,
                           task_text='service_task')
            folder.save()
            folder_id_list = Tasks.objects.filter(email=user_email, folder_name=folder_name).values()
            folder_id = folder_id_list[0]['id']
            return Response({'message': 'Successfully',
                             'status': 'success',
                             'folder_id': folder_id})
        except Exception as Error:
            print(Error)
            return Response({'message': 'An unexpected error has occurred. Try again',
                             'status': 'failure'})

    def delete(self, request):
        try:
            if not self.check_request(request):
                return Response({'message': 'Not all fields are filled',
                                 'status': 'failure'})
            user_id = request.data['user_id']
            folder_name = request.data['folder_name']
            user_email = self.get_user_email(user_id)
            folder = Tasks.objects.filter(email=user_email,
                                          folder_name=folder_name).delete()
            return Response({'message': 'Successfully',
                             'status': 'success'})
        except Exception as Error:
            print(Error)
            return Response({'message': 'An unexpected error has occurred. Try again',
                             'status': 'failure'})

    @staticmethod
    def check_request(request):
        if 'user_id' in request.data and 'folder_name' in request.data:
            return True
        else:
            return False

    @staticmethod
    def get_user_email(user_id):
        user_email = CustomUser.objects.all().get(id=user_id)
        return str(user_email)


class MainMenuView(APIView):
    def get(self, request, pk):
        try:
            data_folders = []
            folder_elem = self.get_all_folders(pk)
            for elem in range(len(folder_elem[0])):
                data_folders.append({
                    'id': folder_elem[1][elem],
                    'folderName': folder_elem[0][elem]})
            # ADD TASKS FROM MAIN FOLDER TO JSON RESPONSE
            tasks_elem = self.get_all_tasks(pk)
            data_tasks = []

            for task in tasks_elem:
                data_tasks.append({
                    'id': task[0],
                    'name': task[1],
                    'completed': task[2],
                    'folderName': task[3],
                    'timeToday': task[4],
                    'timeTotal': task[5]
                })
            return Response({'folders': data_folders,
                             'tasks': data_tasks})
        except Exception as MainMenu:
            print(MainMenu)
            return Response({'message': 'An unexpected error has occurred. Try again',
                             'status': 'failure'})

    @staticmethod
    def get_all_folders(pk):
        user = CustomUser.objects.all().get(pk=pk)
        user_email = str(user)
        folders = Tasks.objects.filter(email=user_email).values()
        folder_names_list = [i['folder_name'] for i in folders if
                             i['task_text'] == 'service_task' and i['folder_name'] not in ['Main Tasks', 'Archive']]
        folder_id_list = [i['id'] for i in folders if
                          i['task_text'] == 'service_task' and i['folder_name'] not in ['Main Tasks', 'Archive']]

        return folder_names_list, folder_id_list

    @staticmethod
    def get_all_tasks(pk):
        user = CustomUser.objects.all().get(pk=pk)
        user_email = str(user)
        tasks = Tasks.objects.filter(email=user_email, folder_name='Main Tasks').values()
        res = []
        for task in tasks:
            if task['task_text'] != 'service_task':
                res.append([task['id'], task['task_text'], task['completed'], 'Main Task', task['time_today'],
                            task['time_all']])
        return res

    @staticmethod
    def get_all_default_tasks(pk):
        user = CustomUser.objects.all().get(pk=pk)
        user_email = str(user)
        tasks = Tasks.objects.filter(email=user_email, folder_name='Main Tasks').values()
        return [task['task_text'] for task in tasks if task['task_text'] != 'service_task']


class TasksView(APIView):
    def post(self, request):
        if not self.check_request_data(request):
            return Response({'message': 'Not all fields are filled',
                             'status': 'failure'})
        try:
            user_email = self.get_user_email(request.data['user_id'])
            # ONLY FOR MAIN AND ARCHIVE TASKS
            if request.data['folder_id'] == 'Main Tasks' or request.data['folder_id'] == 'Archive':
                folder_name = self.check_folder_name(request.data['folder_id'])
                task = Tasks(folder_name=request.data['folder_id'], email=user_email,
                             task_text=request.data['task_text']).save()
                task = Tasks.objects.filter(email=user_email, folder_name=request.data['folder_id'],
                                            task_text=request.data['task_text']).values()

                return Response({'id': task[0]['id'],
                                 'name': task[0]['task_text'],
                                 'completed': task[0]['completed'],
                                 'folderName': folder_name,
                                 'timeToday': task[0]['time_today'],
                                 'timeTotal': task[0]['time_all']})
            else:
                pass
        except Exception as add_task_error:
            print(add_task_error)
            return Response({'message': 'An unexpected error has occurred. Try again',
                             'status': 'failure'})

    def delete(self, request):
        if not self.check_request_data(request):
            return Response({'message': 'Not all fields are filled',
                             'status': 'failure'})
        try:
            user_email = CustomUser.objects.all().get(id=request.data['user_id'])
            if not self.check_if_folder_exist(user_email=user_email, folder_name=request.data['folder_name']):
                return Response({'message': 'Folder not found ',
                                 'status': 'failure'})
            else:
                tasks = Tasks.objects.filter(email=user_email, folder_name=request.data['folder_name'],
                                             task_text=request.data['task_text']).delete()
                return Response({'message': 'Task deleted successfully',
                                 'status': 'success'})
        except Exception as add_task_error:
            print(add_task_error)
            return Response({'message': 'An unexpected error has occurred. Try again',
                             'status': 'failure'})

    def put(self, request):
        # Entry.objects.filter(pub_date__year=2007).update(headline='Everything is the same')
        if not self.check_request_data(request) or not 'new_task_text' in request.data:
            return Response({'message': 'Not all fields are filled',
                             'status': 'failure'})

        try:
            user_email = CustomUser.objects.all().get(id=request.data['user_id'])
            if not self.check_if_folder_exist(user_email=user_email, folder_name=request.data['folder_name']):
                return Response({'message': 'Folder not found ',
                                 'status': 'failure'})
            else:
                task_update = Tasks.objects.filter(email=user_email, folder_name=request.data['folder_name'],
                                                   task_text=request.data['task_text']).update(
                    task_text=request.data['new_task_text'])
                return Response({'message': 'Task updated successfully',
                                 'status': 'success'})
        except Exception as add_task_error:
            print(add_task_error)
            return Response({'message': 'An unexpected error has occurred. Try again',
                             'status': 'failure'})

    @staticmethod
    def check_request_data(request):
        if 'user_id' in request.data and 'folder_id' in request.data and 'task_text' in request.data:
            return True
        else:
            return False

    @staticmethod
    def check_if_folder_exist(user_email, folder_name):
        folder_tasks = list(Tasks.objects.filter(email=user_email, folder_name=folder_name).values())
        if len(folder_tasks) >= 1:
            return True
        else:
            return False

    @staticmethod
    def get_user_email(user_id):
        user_email = CustomUser.objects.all().get(id=user_id)
        return str(user_email)

    @staticmethod
    def check_folder_name(folder_name):
        if folder_name == 'Main Tasks':
            return 'Основные задачи'
        else:
            return 'Архив'
