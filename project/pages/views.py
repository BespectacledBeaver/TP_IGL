from django.shortcuts import render
from rest_framework.views import APIView 
from userManagementApp.serializers import UserSerializer 
from rest_framework.response import Response 
from rest_framework import status
from userManagementApp.models import User 
import jwt , datetime  
from django.views.generic.list import ListView
from django.views.generic.edit import CreateView,UpdateView,DeleteView
from django.urls import reverse_lazy

class Signupview(APIView):
    def post(self , request): 
    
        username = request.data.get("username")
        
        if username is not None:
            user = User.objects.filter(username=username).first()

            if user is None:

                serializer = UserSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()

                data_to_frontend = {
                "username": username,
                "is_authenticated": True
                }

                response = Response(data_to_frontend)
                return response
            else:
                data_to_frontend = {
                "is_authenticated": False
                }
                response = Response(data_to_frontend)
                return response
        else:
            data_to_frontend = {
            "is_authenticated": False
            }

            response = Response(data_to_frontend)
            return response

class Loginview(APIView):
    def post(self , request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = User.objects.filter(username=username).first()
        
        visitor = "Not Found"
        is_authenticated = False 
        if user is not None:
            if  user.password == password :
                visitor = "user"
                is_authenticated = True
       
        
        if is_authenticated:
            payload = {
                "id": user.id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=10),
                "iat": datetime.datetime.utcnow()
            }
            token = jwt.encode(payload, 'secret', algorithm="HS256")
            
            # Send additional data to frontend
            data_to_frontend = {
                "username": user.username,
                "is_authenticated": True
            }
        else:
            token = None
            data_to_frontend = {
                "is_authenticated": False
            }
        
        response = Response(data_to_frontend)
        
        if token:
            response.set_cookie("SESSION", value=token)
        
        return response
    
    


    
