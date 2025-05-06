from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser, Note, Item, Claim

# Register your CustomUser instead of default User
@admin.register(CustomUser)
class CustomUserAdmin(BaseUserAdmin):
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2'),
        }),
    )
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    list_display = ('username', 'email', 'is_staff')
    search_fields = ('username', 'email')

# Register Note model
admin.site.register(Note)

# Register Item model with custom admin
@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'status', 'location', 'date_reported', 'author')
    list_filter = ('category', 'status', 'date_reported')
    search_fields = ('name', 'description', 'location')

# Register Claim model with filters and better display
@admin.register(Claim)
class ClaimAdmin(admin.ModelAdmin):
    list_display = ('item', 'user', 'status', 'approval_date')  # Using 'approval_date' here
    list_filter = ('status', 'approval_date', 'user')  # Using 'approval_date' here
    search_fields = ('item__name', 'user__username')
