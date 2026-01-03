import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse,HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from google import genai
from google.genai import types

@csrf_exempt
def test(request):
    return render(request, 'index.html')

# @csrf_exempt
@api_view(['POST'])
def chat(request):
    message=request.data.get("message")
    clint=genai.Client(api_key="AIzaSyCdlDm7whxklJV9F-TM0XRa8TlVfFs0KK4")
    response=clint.models.generate_content(
        model='gemini-2.5-flash',
        config=types.GenerateContentConfig(
            system_instruction=''
        ),
        contents=message
    )
    return Response({"res":response.text})
