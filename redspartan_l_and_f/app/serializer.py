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
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Claim
        fields = '__all__'
        read_only_fields = ['user', 'approval_date']

    # def create(self, validated_data):
    #     validated_data['user'] = self.context['request'].user
    #     return super().create(validated_data)

    def validate(self, data):
        request = self.context.get("request")
        user = request.user if request else None
        item = data.get("item")

        if not user or not item:
            raise serializers.ValidationError("User or item is missing.")

        # Exclude current instance for update cases
        exclude_pk = self.instance.pk if self.instance else None
        base_qs = Claim.objects.exclude(pk=exclude_pk)

        # 1. Repeat denied claim for same item
        if base_qs.filter(item=item, user=user, status='denied').exists():
            raise serializers.ValidationError(
                "You have already been denied a claim for this item."
            )

        # 2. Another user's pending claim
        if base_qs.filter(item=item, status='pending').exists():
            raise serializers.ValidationError(
                "This item already has a pending claim."
            )

        # 3. Already resolved (approved/claimed)
        if base_qs.filter(item=item, status__in=['approved', 'claimed']).exists():
            raise serializers.ValidationError(
                "This item has already been claimed or approved for claim."
            )

        # 4. User already has another active claim
        if base_qs.filter(user=user, status__in=['pending', 'approved']).exists():
            raise serializers.ValidationError(
                "You already have an active claim."
            )

        return data
