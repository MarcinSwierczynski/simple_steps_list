from django.conf.urls.defaults import patterns, url


urlpatterns = patterns('tools.views',
    url(r'^$', 'main', name='main'),
)
