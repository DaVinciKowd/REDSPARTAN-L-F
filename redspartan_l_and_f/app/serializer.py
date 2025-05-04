from .models import CustomUser
from rest_framework import serializers
from .models import *

class CustomUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    email = serializers.EmailField()

    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {
            "password": {"write_only": True},
            # Explicitly remove built-in unique validator
            "username": {"validators": []},
            "email": {"validators": []},
        }

    def validate_username(self, value):
        if CustomUser.objects.filter(username=value).exists():
            raise serializers.ValidationError("User already exists")
        return value

    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already in use")
        return value

    def validate(self, attrs):
        username = attrs.get("username")
        email = attrs.get("email")
        if username and email and username != email[:8]:
            raise serializers.ValidationError({
                "username": f"Username must match the first 8 characters of the email ({email[:8]})."
            })
        return attrs

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)
    

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'
        read_only_fields = ['author']

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)

class ClaimSerializer(serializers.ModelSerializer):
    class Meta:
        model = Claim
        fields = '__all__'