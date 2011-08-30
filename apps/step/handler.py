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
            return rc.CREATED
        except ValueError:
            return activity_form.errors
