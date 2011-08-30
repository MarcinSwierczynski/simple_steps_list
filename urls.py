from django.conf import settings
from django.conf.urls.defaults import *

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Media files
    (r'^site_media/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': '%s/site_media' % settings.APPLICATION_ROOT}),

    # Examples:
    # url(r'^$', 'simple_steps_list.views.home', name='home'),
    # url(r'^simple_steps_list/', include('simple_steps_list.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),

    (r'^accounts/login/$', 'django.contrib.auth.views.login'),

    (r'^step/', include('step.urls'))
)
