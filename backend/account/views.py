from django.core.mail import send_mail
from django.core.mail import EmailMessage, get_connection
from rest_framework.decorators import action
import string
import random
from django.conf import settings
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from config.settings import DEFAULT_FROM_EMAIL
from .serializers import MyTokenObtainPairSerializer,MyTokenRefreshSerializer,UserSerializer, ChangePasswordSerializer,ResetPasswordSerializer,UserRegistrationSerializer,ProfileSerializer

from rest_framework_simplejwt.views import TokenViewBase,TokenRefreshView
from .models import Enquiry,User,Profile
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework import viewsets
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated,IsAdminUser,IsAuthenticatedOrReadOnly
from rest_framework.response import  Response


class UserRegistrationViewSet(ModelViewSet):
    serializer_class = UserRegistrationSerializer

    @action(detail=False, methods=['post'],permission_classes=[])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)







class UserViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing the accounts
    associated with the user.
    """
    queryset=User.objects.all()
    serializer=UserSerializer

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'change_password':
            permission_classes = [IsAuthenticated]
        elif self.action == 'send_otp' or self.action == 'reset_password' or self.action == 'user_create':
            permission_classes=[] 
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]
    


    @action(detail=True, methods=['post'])
    def change_password(self, request):
        
 
        
        user = request.user
        
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        

        if serializer.is_valid():
            old_password = serializer.validated_data.get('old_password')
            password = serializer.validated_data.get('password')

            # Check if the old password matches the user's current password
            if not user.check_password(old_password):
                return Response({'detail': 'Old password is incorrect'}, status=status.HTTP_400_BAD_REQUEST)

            # Set the new password
            user.set_password(password)
            user.save()

            return Response({'status': 'Password set'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            


    @action(detail=True, methods=['post'])
    def send_otp(self, request, pk=None):
        email=request.data.get('email').lower() if request.data.get('email') else None
        user=get_object_or_404(User,email=email)
        otp=''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        user.otp=otp
        user.save()
        with get_connection(    host=settings.EMAIL_HOST,   port=settings.EMAIL_PORT,   username=settings.EMAIL_HOST_USER,  password=settings.EMAIL_HOST_PASSWORD, use_tls=settings.EMAIL_USE_TLS  ) as connection:
           EmailMessage("OTP for validation", otp, "sg@gmail.com", [email], connection=connection).send()
        #send_mail("OTP for validation", otp, "sg@gmail.com", [email], fail_silently=True)
        return Response({'status': 'OTP Send on your email Id'})
  

    @action(detail=True, methods=['post'])
    def reset_password(self, request, pk=None):
        email=request.data.get('email').lower() if request.data.get('email') else None
        user=get_object_or_404(User,email=email)
        if request.data.get('otp') == user.otp:
            serializer = ChangePasswordSerializer(data=request.data)
            if serializer.is_valid():
                user.set_password(serializer.validated_data['password'])
                user.otp=None
                user.save()
                return Response({'status': 'password set'})
            else:
                return Response(serializer.errors,
                                status=status.HTTP_400_BAD_REQUEST)
        return Response({'status': 'OTP does not match'},status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False)
    def recent_users(self, request):
        recent_users = User.objects.all().order_by('-last_login')
        page = self.paginate_queryset(recent_users)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(recent_users, many=True)
        return Response(serializer.data)







@api_view(["POST"])
@permission_classes([])
def send_enquiry_email(request):
    data = request.data 

    name = data["name"]
    subject = data["subject"]
    mobile_no=data["mobile_no"]
    message = data["message"] +"\n\nName:"+data["name"]+"\n" +"Mobile No:"+ mobile_no
    from_email = data["email"]
    receiver=data["receiver"]
    recipient_list = ["abc.gmail.com"]
    
    with get_connection(    host=settings.EMAIL_HOST,   port=settings.EMAIL_PORT,   username=settings.EMAIL_HOST_USER,  password=settings.EMAIL_HOST_PASSWORD, use_tls=settings.EMAIL_USE_TLS  ) as connection:
        EmailMessage(subject, message, from_email, recipient_list, connection=connection).send()
    
    #send_mail("OTP for validation", "TEsis", "sg@gmail.com", ["abc.com"], fail_silently=False)
    enquiry = Enquiry(name=name, email=from_email, subject=subject,mobile_no=data["mobile_no"], message=message)
    enquiry.save()
    return Response({"success": "Your Enquiry was successfully submitted"},status=status.HTTP_200_OK)





class MyTokenObtainPairView(TokenViewBase):
    serializer_class = MyTokenObtainPairSerializer

class MyTokenRefreshView(TokenRefreshView):
    serializer_class = MyTokenRefreshSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing the categories associated with the authenticated user's store.
    """
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
 
 
    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)


    def update(self, request, *args, **kwargs):
        instance = get_object_or_404(Profile,user=self.request.user)
  
        serializer = self.get_serializer(instance, data=request.data, partial=False)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=self.request.user)

        return Response(serializer.data)


        # Use the same serializer as in create
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

        
 