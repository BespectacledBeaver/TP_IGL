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
from rest_framework.decorators import api_view



class Signupview(APIView):
    def post(self , request): 
    
        username = request.data.get("username")
        if username is not None:
            user = User.objects.filter(name=username).first()

            if user is None:
                serializer = UserSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "User with this username already exists."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Please provide a 'username' in the request data."}, status=status.HTTP_400_BAD_REQUEST)


class Loginview(APIView):
    def post(self , request):
        name = request.data["name"]
        password = request.data["password"]
        user = User.objects.filter(name=name).first()
        
        visitor = "Not Found"
        if user is not None:
            if  user.password == password :
                visitor = "user"
       
        payload = {
            "id" : user.id , 
            "exp" : datetime.datetime.utcnow() + datetime.timedelta(minutes=10) ,
            "iat" : datetime.datetime.utcnow()
        }
        token = jwt.encode(payload,'secret', algorithm="HS256")
        reponse = Response() 
        reponse.data = {
            "token" : token , 
             "visitor" : visitor 
        }
        reponse.set_cookie("SESSION",value=token) 
        return reponse 
    


    
