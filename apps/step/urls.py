from django.conf.urls.defaults import patterns, url
from piston.resource import Resource
from step.handler import ActivityCreatorHandler, ActivityEditorHandler

activity_creator_handler = Resource(ActivityCreatorHandler)
activity_editor_handler = Resource(ActivityEditorHandler)

urlpatterns = patterns('step.views',
   url(r'^list$', 'list', name='steps-list'),
   url(r'^(?P<activity_id>.+)$', activity_editor_handler, name='edit-activities'),
   url(r'^$', activity_creator_handler, name='create-activities'),
)
