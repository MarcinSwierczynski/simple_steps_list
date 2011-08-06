# Create your views here.
from django.shortcuts import render_to_response
from step.models import Activity

def list(request):
    activity = Activity.objects.all()[0]
    return render_to_response('step/list.html', {'activity':activity})