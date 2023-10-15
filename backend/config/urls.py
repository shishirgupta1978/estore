from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from account.views import index,catch_all


urlpatterns = [
    path("", index, name="front"),
    path('account/', include('account.urls')),
    path('store/', include('store.urls')),
    path('admin/', admin.site.urls),
    path('<path:unknown_path>/', catch_all, name='catch_all')

]
if settings.DEBUG:
    urlpatterns +=  static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


admin.site.site_header = "Admin"
admin.site.site_title = "Admin Portal"
admin.site.index_title = "Welcome to the Admin Portal"