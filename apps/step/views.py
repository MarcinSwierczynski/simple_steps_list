# Create your views here.
from django.contrib.auth.decorators import login_required
from django.shortcuts import render_to_response
from django.template import RequestContext
from step.models import Activity

@login_required
def list(request):
    activity = Activity.objects.all()[0]
    return render_to_response('step/list.html',
                              {'activity': activity},
                              context_instance=RequestContext(request))