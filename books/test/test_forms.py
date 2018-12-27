from django.test import TestCase

from books.forms import IsbnForm

# FORMS
class IsbnFormTest(TestCase):
    def test_valid_data(self):
        form = IsbnForm({'isbn': '9780133065268'})

        self.assertTrue(form.is_valid())

    def test_invalid_data(self):
        form = IsbnForm()

        self.assertFalse(form.is_valid())