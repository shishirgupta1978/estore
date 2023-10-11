from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.conf import settings
from .models import Enquiry
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer,TokenRefreshSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User


class ChangePasswordSerializer(serializers.ModelSerializer):
     class Meta: 
        model = User 
        fields = ['password']

class ResetPasswordSerializer(serializers.ModelSerializer):
     class Meta: 
        model = User 
        fields = ['email','password','otp']


class UserSerializer(serializers.ModelSerializer):
     class Meta: 
        model = User 
        fields = '__all__'


class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = "__all__"


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['is_staff'] = user.is_staff
        return token


class MyTokenRefreshSerializer(TokenRefreshSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token
