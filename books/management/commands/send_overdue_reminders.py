from django.core.management.base import BaseCommand

from books.cron.send_notification import send_borrows_out_of_time_notifications


class Command(BaseCommand):
    help = 'Send email reminders for overdue book borrows.'

    def handle(self, *args, **options):
        send_borrows_out_of_time_notifications()
        self.stdout.write(self.style.SUCCESS('Overdue reminders check complete.'))
