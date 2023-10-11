from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from .views import send_enquiry_email,MyTokenObtainPairView,UserViewSet,MyTokenRefreshView
from rest_framework import routers



router = routers.DefaultRouter()
router.register(r'auth', UserViewSet, basename='auth')

urlpatterns = [
    path('', include(router.urls)),
    path("change-password/", UserViewSet.as_view({'post','set_password'}), name="change-password"),
    path("send-otp/", UserViewSet.as_view({'post':'send_otp'}), name="send-otp"),
    path("reset-password/", UserViewSet.as_view({'post':'reset_password'}), name="reset-password"),
    path("send-enquery-email/", send_enquiry_email, name="send-enquiry-email"),
    path('tokens/', MyTokenObtainPairView.as_view(), name='tokens'),
    path('token-refresh/', MyTokenRefreshView.as_view(), name='token-refresh'),
   
]
