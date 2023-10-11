import uuid
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
from django.utils.translation import gettext_lazy as _


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name=_("Email Address"), unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    otp=models.CharField(max_length=8,default=False,null=True,blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")

    def __str__(self):
        return self.email
    
class TimeStampedUUIDModel(models.Model):
    pkid = models.BigAutoField(primary_key=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,related_name="profile", editable=False)
    username = models.CharField(verbose_name=_("Username"), max_length=255, unique=True)
    profile_pic = models.ImageField(verbose_name=_("Profile Pic"),upload_to='profile_pics/',null=True,blank=True)
    first_name = models.CharField(verbose_name=_("First Name"), max_length=50,blank=True,null=True)
    last_name = models.CharField(verbose_name=_("Last Name"), max_length=50,blank=True,null=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Profile")
        verbose_name_plural = _("Profiles")

    def save(self, *args, **kwargs):
        if not self.username:
            if self.user.email:
                self.username = self.user.email.split('@')[0]
                base_username = self.username.lower()
                counter = 1
                while Profile.objects.filter(username=self.username).exclude(pk=self.pk).exists():
                    self.username = f"{base_username}-{counter}"
                    counter += 1
        super().save(*args, **kwargs)

    def __str__(self):
        return self.user.email

class Address(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE,related_name="addresses",editable=False)
    type=models.CharField(max_length=100,null=True,blank=True)
    mobile_no=models.CharField(max_length=100,null=True,blank=True)
    flat_no=models.CharField(max_length=100,null=True,blank=True)
    street=models.CharField(max_length=100,null=True,blank=True)
    city=models.CharField(max_length=100,null=True,blank=True)
    state=models.CharField(max_length=100,null=True,blank=True)
    country=models.CharField(max_length=100,null=True,blank=True)

    class Meta:
        unique_together = ["user", "type"]

class Enquiry(TimeStampedUUIDModel):
    name = models.CharField(_("Your Name"), max_length=100)
    phone_number = models.IntegerField(blank=True,null=True )
    email = models.EmailField(_("Email"))
    subject = models.CharField(_("Subject"), max_length=100)
    message = models.TextField(_("Message"))

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = "Enquiries"
