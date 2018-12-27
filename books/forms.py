from django import forms


class IsbnForm(forms.Form):
    isbn = forms.CharField(max_length=13, required=True)
