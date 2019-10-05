FROM python:3.7.4

# Te envy można przekazywać poprzez docker-compose
ARG DJANGO_ENV=production
ENV DJANGO_ENV=${DJANGO_ENV}

WORKDIR /backend

RUN pip install --upgrade pip
RUN pip install pipenv

COPY Pipfile Pipfile.lock ./
RUN pipenv install $(test "$DJANGO_ENV" = production || echo "--dev") --system --deploy

COPY . .

RUN chmod +x "./scripts/entrypoint.sh"
ENTRYPOINT ["/bin/sh", "./scripts/entrypoint.sh"]
