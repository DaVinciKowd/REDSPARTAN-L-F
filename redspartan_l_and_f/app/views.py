from django.shortcuts import render
from .models import CustomUser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework import viewsets, filters
# from rest_framework.views import APIView
# from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
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
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all().order_by('-date_reported')
    serializer_class = ItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    filter_backends = [DjangoFilterBackend, 
                       filters.SearchFilter, 
                       filters.OrderingFilter]

    filterset_fields = ['status', 'category']
    search_fields = ['name', 'description', 'category']

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request 
        return context

class ClaimViewSet(viewsets.ModelViewSet):
    queryset = Claim.objects.all().order_by('user__username')  # Default ordering
    serializer_class = ClaimSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['user__username', 'status', 'approval_date']
    ordering = ['user__username']  # Default ordering

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_serializer_context(self):
        return {"request": self.request}

