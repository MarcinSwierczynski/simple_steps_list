from django.core.urlresolvers import reverse
from django.test import TestCase
from step.models import Activity

class ActivityTestCase(TestCase):
    fixtures = ['steps']

#    def setUp(self):
#        self.activity = Activity(name='Programming')
#        self.activity.save()

    def test_list_activities(self):
        self.client.login(username='admin', password='mars')
        response = self.client.get(reverse('steps-list'), follow=True)
        self.assertContains(response, Activity.objects.all()[0].name)
