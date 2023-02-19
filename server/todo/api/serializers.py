from rest_framework import serializers
from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'is_staff', 'date_joined', 'last_login')


class RegisterUserSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        email = serializers.EmailField(required=True)
        password = serializers.CharField(required=True)
        return CustomUser.objects.create(**validated_data)
