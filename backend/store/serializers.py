from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.conf import settings
from .models import StoreProfile, Category, Product,Banner


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.ReadOnlyField(source='category.name')
    
    class Meta: 
        model = Product
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    store = serializers.ReadOnlyField(source='store.website_name')
    products=ProductSerializer(many=True)
    class Meta: 
        model = Category
        fields = '__all__'


class BannerSerializer(serializers.ModelSerializer):
    store = serializers.ReadOnlyField(source='store.website_name')
    class Meta: 
        model = Banner
        fields ='__all__'

class StoreProfileSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.email')
    product_categories=CategorySerializer(many=True)
    banners=BannerSerializer(many=True)
    class Meta: 
        model = StoreProfile
        fields ='__all__'

   
