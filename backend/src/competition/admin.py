from django.contrib import admin

from competition.models import Competition, Submission, JudgeSubmissionScore

admin.site.register(Competition)
admin.site.register(Submission)
admin.site.register(JudgeSubmissionScore)

