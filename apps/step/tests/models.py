from django.utils import unittest
from step.models import Activity

class ActivityTestCase(unittest.TestCase):

    def test_string_representation(self):
        activity = Activity(name='Reading')
        self.assertEqual(str(activity), activity.name)
