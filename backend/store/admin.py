from django.contrib import admin
from django import forms
from django.contrib.auth import get_user_model



from .models import Product,Category,StoreProfile,Banner


User=get_user_model()

# Register your models here.
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(StoreProfile)
admin.site.register(Banner)