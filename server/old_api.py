'''

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
                print(task[0]['time_today'])
                try:
                    time_today = str(task[0]['time_today']).split()[1].split('+')[0]
                    time_all = str(task[0]['time_all']).split()[1].split('+')[0]
                except Exception as time_error:
                    pass
                return Response({'id': task[0]['id'],
                                 'name': task[0]['task_text'],
                                 'completed': task[0]['completed'],
                                 'folderName': folder_name,
                                 'timeToday': time_today,
                                 'timeTotal': time_all})
            else:
                folder_name = self.get_folder_name(request.data['folder_id'])
                is_folder_name = self.check_folder_name(request.data['folder_id'])
                task = Tasks(folder_name=folder_name, email=user_email,
                             task_text=request.data['task_text']).save()
                task = Tasks.objects.filter(email=user_email, folder_name=folder_name,
                                            task_text=request.data['task_text']).values()
                print(task[0]['time_today'])
                try:
                    time_today = str(task[0]['time_today']).split()[1].split('+')[0]
                    time_all = str(task[0]['time_all']).split()[1].split('+')[0]
                except Exception as time_error:
                    pass
                return Response({'id': task[0]['id'],
                                 'name': task[0]['task_text'],
                                 'completed': task[0]['completed'],
                                 'folderName': folder_name,
                                 'timeToday': time_today,
                                 'timeTotal': time_all})
        except Exception as add_task_error:
            print(add_task_error)
            print('error')
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
    def get_folder_name(id):
        folder = Tasks.objects.filter(id=id, task_text='service_task').values()[0]
        return folder['folder_name']

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


# {
#    "id": 22,
#    "name": "123",
#    "completed": false,
#   "folderName": "Test",
#    "timeToday": "00:00:00",
#    "timeTotal": "00:00:00"
# }
class UpdateTasksView(APIView):
    def post(self, request):
        try:
            if self.check_request_data(request):
                user_email = CustomUser.objects.all().get(id=request.data['user_id'])
                res = self.get_all_tasks(request.data['user_id'], request.data['folder_id'])
                data_tasks = []

                for task in res:
                    data_tasks.append({
                        'id': task[0],
                        'name': task[1],
                        'completed': task[2],
                        'folderName': task[3],
                        'timeToday': task[4],
                        'timeTotal': task[5]
                    })

                return Response({'tasks': data_tasks})
            else:
                return Response({'message': 'Not all fields are filled',
                                 'status': 'failure'})


        except Exception as Error:
            return Response({'message': 'An unexpected error has occurred. Try again',
                             'status': 'failure'})

    @staticmethod
    def user_email(user_id):
        user_email = CustomUser.objects.all().get(id=user_id)
        return str(user_email)

    @staticmethod
    def get_all_tasks(user_id, folder_id):
        if folder_id == 'Archive' or folder_id == 'Main Tasks':
            user = CustomUser.objects.all().get(id=user_id)
            user_email = str(user)
            tasks = Tasks.objects.filter(email=user_email, folder_name=folder_id).values()
            res = []
            for task in tasks:
                if task['task_text'] != 'service_task':
                    res.append([task['id'], task['task_text'], task['completed'], folder_id, task['time_today'],
                                task['time_all']])
            return res
        else:
            folder_name = Tasks.objects.filter(id=folder_id, task_text='service_task').values()[0]['folder_name']
            print(folder_name)
            user = CustomUser.objects.all().get(id=user_id)
            user_email = str(user)
            tasks = Tasks.objects.filter(email=user_email, folder_name=folder_name).values()
            res = []
            for task in tasks:
                if task['task_text'] != 'service_task':
                    res.append([task['id'], task['task_text'], task['completed'], folder_name, task['time_today'],
                                task['time_all']])
            return res

    @staticmethod
    def check_request_data(request):
        if 'user_id' in request.data and 'folder_id' in request.data:
            return True
        else:
            return False
'''