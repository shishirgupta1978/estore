from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from .views import StoreProfileViewSet,CategoryViewSet,ProductViewSet,get_store,BannerViewSet


router = routers.DefaultRouter()

router.register(r'stores', StoreProfileViewSet, basename='stores')
router.register(r'stores/(?P<store_id>[^/.]+)/categories', CategoryViewSet, basename='categories')
router.register(r'stores/(?P<store_id>[^/.]+)/banners', BannerViewSet, basename='banners')
router.register(r'stores/(?P<store_id>[^/.]+)/categories/(?P<category_id>[^/.]+)/products', ProductViewSet, basename='products')



urlpatterns = [
    path('', include(router.urls)),
    path('websites/', StoreProfileViewSet.as_view({'get':'public_list'}), name="wesite-list"),
    path('get-website/<slug:store_slug>/',get_store , name="get-website"),
    path('websites/<int:store_id>/', CategoryViewSet.as_view({'get':'public_list'}), name="category-list"),
    path('websites/<slug:store_slug>/get-cart-data/', ProductViewSet.as_view({'post':'get_cart_data'}), name="get-cart-data"),
    
    path('websites/<int:store_id>/banners/', BannerViewSet.as_view({'get':'public_list'}), name="banner-list"),
    path('websites/<int:store_id>/categories/', ProductViewSet.as_view({'get':'public_list'}), name="product-list-all"),

    path('websites/<slug:website_name>/categories/', CategoryViewSet.as_view({'get':'category_list_by_store_name'}), name="categories-by-store-name"),

    
    path('websites/<int:store_id>/categories/<int:category_id>/', ProductViewSet.as_view({'get':'public_list'}), name="product-list"),
      
]
