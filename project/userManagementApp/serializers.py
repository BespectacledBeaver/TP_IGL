from rest_framework.serializers import ModelSerializer 
from .models import *
# import form models your model 
class UserSerializer(ModelSerializer):
    class Meta(object):
        # we put out model to serialize the model
        model = User
        fields = '__all__'
        #fields = ['id','username','password']
