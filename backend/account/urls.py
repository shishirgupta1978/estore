from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from .views import send_enquiry_email,MyTokenObtainPairView,UserViewSet,MyTokenRefreshView,UserRegistrationViewSet,ProfileViewSet
from rest_framework import routers



router = routers.DefaultRouter()
router.register(r'auth', UserViewSet, basename='auth')
router.register(r'register', UserRegistrationViewSet, basename='user-registration')
router.register(r'profile', ProfileViewSet, basename='user-profile')


urlpatterns = [
    path('', include(router.urls)),
    path("change-password/", UserViewSet.as_view({'post':'change_password'}), name="change-password"),
    path("send-otp/", UserViewSet.as_view({'post':'send_otp'}), name="send-otp"),
    path("reset-password/", UserViewSet.as_view({'post':'reset_password'}), name="reset-password"),
    path("send-enquiry-email/", send_enquiry_email, name="send-enquiry-email"),
    path('tokens/', MyTokenObtainPairView.as_view(), name='tokens'),
    path('token-refresh/', MyTokenRefreshView.as_view(), name='token-refresh'),
   
]
