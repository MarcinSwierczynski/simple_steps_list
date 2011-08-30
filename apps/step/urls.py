from django.conf.urls.defaults import patterns, url
from piston.resource import Resource
from step.handler import ActivityCreatorHandler

activity_creator_handler = Resource(ActivityCreatorHandler)

urlpatterns = patterns('step.views',
                       url(r'^list$', 'list', name='steps-list'),
                       url(r'^$', activity_creator_handler, name='all-steps'),
                       )
