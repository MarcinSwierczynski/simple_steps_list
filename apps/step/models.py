from django.db import models
from django.utils.translation import ugettext_lazy as _
from djangotoolbox.fields import ListField

class Activity(models.Model):
    """
    Describes activity supposed to accomplish each day
    """
    name = models.CharField(_("Name"), max_length=200, unique=True)
    dates = ListField()

    def __unicode__(self):
        return self.name
