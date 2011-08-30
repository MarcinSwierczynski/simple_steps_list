from django import forms
from step.models import Activity

class ActivityForm(forms.ModelForm):
    class Meta:
        model = Activity
