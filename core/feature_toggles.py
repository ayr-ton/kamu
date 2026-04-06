from django.conf import settings


def is_async_tasks_enabled():
    return getattr(settings, 'KAMU_ENABLE_ASYNC_TASKS', False)


def run_async_task(func, *args, **kwargs):
    """Call func synchronously when KAMU_ENABLE_ASYNC_TASKS is True."""
    if is_async_tasks_enabled():
        func(*args, **kwargs)
