from time import sleep

from judge.celery import app


@app.task
def hello():
    sleep(8)
    print("Hello there!")
