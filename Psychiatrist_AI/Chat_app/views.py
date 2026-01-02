import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.http import JsonResponse,HttpResponse
from google import genai

@csrf_exempt
def home(request):
    return render(request, 'index.html')


@csrf_exempt
@require_POST
def chat(request):
    dta=json.loads(request.body.decode('utf-8'))
    name=dta.get("User")
    clint=genai.Client(api_key="AIzaSyDEZheQAel6JDmHw4YwVYx00TMXW-LC1Jo")
    response = clint.models.generate_content(
        model="gemini-2.5-flash",
        contents=name
    )
    print(response.text)
    return JsonResponse({"Response":response.text})