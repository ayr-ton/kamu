from celery import task

@task
def debug_task():
    print('Running debug dask!')
