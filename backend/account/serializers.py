from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.conf import settings
from .models import Enquiry
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer,TokenRefreshSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User,Profile
from rest_framework.exceptions import ValidationError
import django.contrib.auth.password_validation as validators
from django.core import exceptions

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    password_confirm = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['email', 'password', 'password_confirm']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        password = data.get('password')
        password_confirm = data.get('password_confirm')
        if password != password_confirm:
            raise serializers.ValidationError("Passwords do not match.")
        validate_password(password)
        return data

    def create(self, validated_data):
        user = User(
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class ChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(required=True, write_only=True)
    password_confirm = serializers.CharField(required=True, write_only=True)
    class Meta: 
        model = User 
        fields = ['old_password','password','password_confirm']

    def validate_old_password(self, value):
        user = self.context['request'].user

        if not user.check_password(value):
            raise ValidationError("Old password is incorrect.")

        return value

    def validate(self, data):
        password = data.get('password')
        password_confirm = data.get('password_confirm')
        user = self.context['request'].user

        if password != password_confirm:
            raise ValidationError("New passwords do not match.")
        errors = dict() 
        try:
            
            validators.validate_password(password=password, user=user)
        
    
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)
        
        if errors:
            raise serializers.ValidationError(errors)
        
        return data


    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()
        return instance

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


class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.email')
    username = serializers.ReadOnlyField()
    class Meta: 
        model = Profile 
        fields = '__all__'
