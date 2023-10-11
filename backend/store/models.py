from django.db import models
from django.contrib.auth import get_user_model
import uuid
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.template.defaultfilters import slugify


User=get_user_model()

class StoreProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,related_name="stores")
    website_name = models.SlugField(unique=True,blank=True, null=True)
    shop_img_url = models.URLField(verbose_name=_("Shop Image Url"), max_length=255)
    short_description = models.CharField(verbose_name=_("Description"), max_length=255)
    logo_img_url = models.URLField(verbose_name=_("Logo Url"), max_length=255,blank=True,null=True)
    store_name = models.CharField(verbose_name=_("Brand Name"), max_length=150)
    contact = models.TextField(verbose_name=_("contact"),blank=True,null=True)
    description = models.TextField(verbose_name=_("Description"),blank=True,null=True)
    
    def __str__(self):
        return self.website_name
    def save(self, *args, **kwargs):
        if not self.website_name:
            if self.store_name:
                self.website_name = slugify(self.store_name)

                # Check if the generated slug already exists, and append a unique identifier if needed
                base_slug = self.website_name
                counter = 1
                while StoreProfile.objects.filter(website_name=self.website_name).exclude(pk=self.pk).exists():
                    self.website_name = f"{base_slug}-{counter}"
                    counter += 1
        super().save(*args, **kwargs)
    

class Banner(models.Model):
    store=models.ForeignKey(StoreProfile,on_delete=models.CASCADE,related_name="banners") 
    img_url=models.URLField(max_length = 255)
    label= models.CharField(max_length = 25)
    text=models.CharField(max_length=255)
    def __str__(self):
        return self.label
    


class ImageUpload(models.Model):
    img= models.ImageField(upload_to='images/')
    def __str__(self):
        return self.img.url

class Category(models.Model):
    name= models.CharField(verbose_name=_("Name"), max_length=155)
    store = models.ForeignKey(StoreProfile, on_delete=models.CASCADE,related_name="product_categories")
    def __str__(self):
        return self.name




class Product(models.Model):
    category=models.ForeignKey(Category,on_delete=models.CASCADE,related_name="products")
    name= models.CharField(verbose_name=_("Product Name"), max_length=255)
    img_url=models.URLField(verbose_name=_("Product Image Url"), max_length=255)
    img_url2=models.URLField(verbose_name=_("Product Image Url2"), max_length=255,blank=True,null=True,default='')
    img_url3=models.URLField(verbose_name=_("Product Image Url3"), max_length=255,blank=True,null=True,default='')
    img_url4=models.URLField(verbose_name=_("Product Image Url4"), max_length=255,blank=True,null=True,default='')
    description=models.TextField(verbose_name=_("Product Description"), blank=True,null=True,default='')
    price= models.PositiveIntegerField(verbose_name=_("Price"))
    discount=models.PositiveIntegerField(verbose_name=_("Discount"),default=0)
    is_available=models.BooleanField(default=True)
    def __str__(self):
        return self.name