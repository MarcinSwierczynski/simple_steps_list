from django.conf.urls.defaults import patterns, url

urlpatterns = patterns('step.views',
    url(r'^list$', 'list', name='steps-list'),
)
