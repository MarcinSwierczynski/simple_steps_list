from django.shortcuts import get_object_or_404
from piston.handler import AnonymousBaseHandler
from piston.utils import rc
from models import Activity
from step.forms import ActivityForm

class ActivityCreatorHandler(AnonymousBaseHandler):
    allowed_methods = ('GET', 'POST')
    fields = ('id', 'name')
    model = Activity

    def read(self, request, *args, **kwargs):
        return Activity.objects.all()

    def create(self, request, *args, **kwargs):
        activity_form = ActivityForm(request.data)
        try:
            activity_form.save()
            return activity_form.instance
        except ValueError:
            return activity_form.errors


class ActivityEditorHandler(AnonymousBaseHandler):
    allowed_methods = ('PUT', 'DELETE')

    def update(self, request, activity_id):
        activity = get_object_or_404(Activity, id=request.data['id'])
        activity_form = ActivityForm(request.data, instance=activity)

        try:
            activity_form.save()
            return activity_form.instance
        except ValueError:
            return activity_form.errors

    def delete(self, request, activity_id):
        activity = get_object_or_404(Activity, id=activity_id)
        activity.delete()
        return rc.DELETED
