from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework import viewsets
# from rest_framework.views import APIView
# from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from . models import *
from . serializer import *
# Create your views here.

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all().order_by('-date_reported')
    serializer_class = ItemSerializer
    filterset_fields = ['status', 'category']
    search_fields = ['name', 'description', 'location']

