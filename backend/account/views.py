from django.core.mail import send_mail
from rest_framework.decorators import action
import string
import random
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from config.settings import DEFAULT_FROM_EMAIL
from .serializers import MyTokenObtainPairSerializer,MyTokenRefreshSerializer,UserSerializer, ChangePasswordSerializer,ResetPasswordSerializer

from rest_framework_simplejwt.views import TokenViewBase,TokenRefreshView
from .models import Enquiry,User
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated,IsAdminUser,IsAuthenticatedOrReadOnly
from rest_framework.response import  Response
#User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing the accounts
    associated with the user.
    """
    queryset=User.objects.all()
    serializer_class = UserSerializer
    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'set_password':
            permission_classes = [IsAuthenticated]
        elif self.action == 'send_otp' or self.action == 'reset_password':
            permission_classes=[] 
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


    @action(detail=True, methods=['post'])
    def set_password(self, request, pk=None):
        user = self.get_object()
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response({'status': 'password set'})
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)


    @action(detail=True, methods=['post'])
    def send_otp(self, request, pk=None):
        email=request.data.get('email').lower() if request.data.get('email') else None
        user=get_object_or_404(User,email=email)
        otp=''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
        user.otp=otp
        user.save()
        send_mail("OTP for validation", otp, "sg@gmail.com", [email], fail_silently=True)
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
@permission_classes([permissions.AllowAny])
def send_enquiry_email(request):
    data = request.data 

    try:
        subject = data["subject"]
        name = data["name"]
        email = data["email"]
        message = data["message"]
        from_email = data["email"]
        recipient_list = [DEFAULT_FROM_EMAIL]
        send_mail(subject, message, from_email, recipient_list, fail_silently=True)
        enquiry = Enquiry(name=name, email=email, subject=subject, message=message)
        enquiry.save()

        return Response({"success": "Your Enquiry was successfully submitted"})

    except:
        return Response({"fail": "Enquiry was not sent. Please try again"})





class MyTokenObtainPairView(TokenViewBase):
    serializer_class = MyTokenObtainPairSerializer

class MyTokenRefreshView(TokenRefreshView):
    serializer_class = MyTokenRefreshSerializer