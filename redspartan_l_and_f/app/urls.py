from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create the router here
router = DefaultRouter()
router.register(r'items', views.ItemViewSet)
router.register(r'claims', views.ClaimViewSet)


urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path('', include(router.urls)),
]
