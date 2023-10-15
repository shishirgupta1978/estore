from django.conf import settings
from django.core.mail import send_mail
from django.core.mail import EmailMessage, get_connection
from rest_framework.decorators import action
from django.template.defaultfilters import slugify
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from config.settings import DEFAULT_FROM_EMAIL
from .serializers import StoreProfileSerializer,CategorySerializer,ProductSerializer,BannerSerializer
from .models import StoreProfile,Category,Product,Banner,Invoice,Order
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated,IsAdminUser,IsAuthenticatedOrReadOnly
from rest_framework.response import  Response
#User = get_user_model()


class StoreProfileViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing the accounts
    associated with the user.
    """

    serializer_class = StoreProfileSerializer
    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'public_list':
            permission_classes = []
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    

    def get_queryset(self):
        if self.action == 'public_list':
            return StoreProfile.objects.all()
        else:
            return StoreProfile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def public_list(self, request):
        stores= StoreProfile.objects.all()
        serializer=StoreProfileSerializer(stores,many=True)
        return Response(serializer.data)






class CategoryViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing the categories associated with the authenticated user's store.
    """
    serializer_class = CategorySerializer
    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'public_list' or self.action=='category_list_by_store_name':
            permission_classes = []
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


    def get_queryset(self):
        if self.action == 'public_list' or self.action == 'category_list_by_store_name':
            return Category.objects.all()
        else:
            store_id = self.kwargs.get('store_id')
            store = get_object_or_404(StoreProfile, user=self.request.user, pk=store_id)
            return Category.objects.filter(store=store)

    def perform_create(self, serializer):
        # Retrieve the store associated with the authenticated user using pk from URL
        store_id = self.kwargs.get('store_id')
        store = get_object_or_404(StoreProfile, user=self.request.user, pk=store_id)
        serializer.save(store=store)

    @action(detail=False)
    def public_list(self, request,store_id=None):
        store = get_object_or_404(StoreProfile, pk=store_id)
        categories= Category.objects.filter(store=store)
        serializers=CategorySerializer(categories,many=True)
        return Response(serializers.data)

    @action(detail=False)
    def category_list_by_store_name(self, request,website_name=None):
        store = get_object_or_404(StoreProfile, website_name=website_name)
        categories= Category.objects.filter(store=store)
        serializers=CategorySerializer(categories,many=True)
        return Response(serializers.data)



class BannerViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing the categories associated with the authenticated user's store.
    """
    serializer_class = BannerSerializer
    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'public_list':
            permission_classes = []
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


    def get_queryset(self):
        if self.action == 'public_list':
            return Banner.objects.all()
        else:
            store_id = self.kwargs.get('store_id')
            store = get_object_or_404(StoreProfile, user=self.request.user, pk=store_id)
            return Banner.objects.filter(store=store)

    def perform_create(self, serializer):
        # Retrieve the store associated with the authenticated user using pk from URL
        store_id = self.kwargs.get('store_id')
        store = get_object_or_404(StoreProfile, user=self.request.user, pk=store_id)
        serializer.save(store=store)

    @action(detail=False)
    def public_list(self, request,store_id=None):
        store = get_object_or_404(StoreProfile, pk=store_id)
        banners= Banner.objects.filter(store=store)
        serializers=BannerSerializer(banners,many=True)
        return Response(serializers.data)




class ProductViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for viewing and editing the categories associated with the authenticated user's store.
    """
    serializer_class = ProductSerializer
    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'public_list' or 'get_card_data':
            permission_classes = []
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        if self.action == 'public_list' or self.action == 'get_cart_data':
            Product.objects.all()
        
        else:
            store_id = self.kwargs.get('store_id')
            category_id=self.kwargs.get('category_id')
            store = get_object_or_404(StoreProfile, user=self.request.user, pk=store_id)
            category=get_object_or_404(Category,store=store,  pk=category_id)
            return Product.objects.filter(category=category)

    def perform_create(self, serializer):
        # Retrieve the store associated with the authenticated user using pk from URL
        store_id = self.kwargs.get('store_id')
        category_id=self.kwargs.get('category_id')
        store = get_object_or_404(StoreProfile, user=self.request.user, pk=store_id)
        category=get_object_or_404(Category,store=store,  pk=category_id)
        serializer.save(category=category)

    @action(detail=False)
    def public_list(self, request,store_id=None,category_id=None):
        store = get_object_or_404(StoreProfile, pk=store_id)
        if category_id is None:
            categories= Category.objects.filter(store=store)
            products= Product.objects.filter(category__in=categories)
        else:
            category=get_object_or_404(Category,store=store,  pk=category_id)
            products= Product.objects.filter(category=category)

        serializers=ProductSerializer(products,many=True)
        return Response(serializers.data)

    @action(detail=False, methods=['post'])
    def get_cart_data(self,request,store_slug):
        stores=StoreProfile.objects.filter(website_name=store_slug)
        objs=Product.objects.filter(id__in=[id for id in request.data.keys()],category__in=Category.objects.filter(store__in=stores))
        serializers= ProductSerializer(objs,many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)
    




@api_view(['GET'])
def get_store_products(request,store_slug):
    store = get_object_or_404(StoreProfile, website_name=store_slug)
    Products=Product.objects.filter(category__in=Category.objects.filter(store=store))
    serializers=ProductSerializer(Products,many=True)
    return Response(serializers.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_store(request,store_slug):
    store = get_object_or_404(StoreProfile, website_name=store_slug)
    serializers=StoreProfileSerializer(store)
    return Response(serializers.data, status=status.HTTP_200_OK)




@api_view(['POST'])
def send_order(request,store_slug):
    store = get_object_or_404(StoreProfile, website_name=store_slug)
    customer_name=request.data.get("customer_name")
    email=request.data.get("email")
    mobile_no=request.data.get("mobile_no")
    address=request.data.get("address")
 
    invoice=Invoice.objects.create(store=store,customer_name=customer_name, email=email, mobile_no=mobile_no,address=address)
    orders=request.data.get("cart")
    products=Product.objects.filter(id__in=orders.keys(),category__in=Category.objects.filter(store=store))
    filter_ids=[product.id for product in products]

    
    checkout_orders=[]
    for id in filter_ids:
        product=Product.objects.get(id=id)
        Order.objects.create(invoice=invoice,quantity=orders[str(id)],product=product,price=product.price,discount=product.discount)
        checkout_orders.append((product.id, product.name, orders[str(id)], product.price,product.discount))
    
    
    res=f"Name: {customer_name}"+"\n"+f"Email: {email}"+"\n"+f"mobile_no: {mobile_no}" +"\n"+f"Address: {address}"+"\n"

    total_price=0
    for ord in checkout_orders:
        total_price += ord[2]* (ord[3]-(ord[3] * ord[4]/100))
        res = res + f"Product Id: {ord[0]}, Name: {ord[1]}, Quantity: {ord[2]},  Price: {ord[3]}, Discount: {ord[4]}, Amount: {ord[2]* (ord[3]-(ord[3] * ord[4]/100))}"+"\n"


    message="Order Details\n\n"+f"Invoice No: {invoice.id}"+"\n"+res +"\n\n" +f"Total Amount: {total_price}"
    with get_connection(    host=settings.EMAIL_HOST,   port=settings.EMAIL_PORT,   username=settings.EMAIL_HOST_USER,  password=settings.EMAIL_HOST_PASSWORD, use_tls=settings.EMAIL_USE_TLS  ) as connection:
           EmailMessage("You received an order", message, settings.DEFAULT_FROM_EMAIL, [store.user.email], connection=connection).send()
    
    return Response({"status":"success","message" :message}, status=status.HTTP_200_OK)
