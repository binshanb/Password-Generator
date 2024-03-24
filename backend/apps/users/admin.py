from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from apps.users.views import *
# Register your models here.
class CustomUserAdmin(UserAdmin):
    list_display = ('id', 'email','first_name','is_active','is_superuser')
    search_fields = ('email', 'phone_number')
    
    # Specify a valid field for ordering, for example, 'id'
    ordering = ('id',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name' )}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        # ('Important dates', {'fields': ('last_login',)}),
    )

admin.site.register(CustomUser, CustomUserAdmin)