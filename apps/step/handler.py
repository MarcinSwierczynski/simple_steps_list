from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from piston.handler import AnonymousBaseHandler
from piston.utils import rc
from models import Activity

class ActivityCreatorHandler(AnonymousBaseHandler):
    allowed_methods = ('GET', 'POST')
    fields = ('id', 'name', 'dates')
    model = Activity

    def read(self, request, *args, **kwargs):
        return Activity.objects.all().order_by('name')

    def create(self, request, *args, **kwargs):
        activity = Activity(name=request.data['name'])
        try:
            activity.full_clean()
            activity.save()
            return activity
        except ValidationError, e:
            return e.message_dict


class ActivityEditorHandler(AnonymousBaseHandler):
    allowed_methods = ('PUT', 'DELETE')

    def update(self, request, activity_id):
        activity = get_object_or_404(Activity, id=request.data['id'])
        activity.name = request.data['name']
        activity.dates = request.data['dates']

        try:
            activity.full_clean()
            activity.save()
            return activity
        except ValidationError, e:
            return e.message_dict

    def delete(self, request, activity_id):
        activity = get_object_or_404(Activity, id=activity_id)
        activity.delete()
        return rc.DELETED
