from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

def home(req):
    Chat_Page=loader.get_template('index.html')
    return HttpResponse(Chat_Page.render())