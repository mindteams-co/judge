include tools.Makefile
.PHONY: help

SCRIPTS_DIR := ./backend/scripts

help:
	@echo "Please use 'make <target>' where <target> is one of the following commands."
	@echo "pipenv-lock             to generate a new Pipfile.lock after adding a new package"
	@echo "backend-bash            to connect to a running backend server via bash"
	@echo "build-dev               to build a development version"
	@echo "build-prod              to build a production version"
	@echo "start                   to start a server"


pipenv-lock:
	sh -c "chmod +x $(SCRIPTS_DIR)/pipenv-lock.sh; $(SCRIPTS_DIR)/pipenv-lock.sh"

backend-bash:
	docker-compose exec backend bash -l

build:
	docker-compose build $(variadic_args)

start:
	docker-compose up $(variadic_args)

bootstrap-dev:
	sh -c "chmod +x $(SCRIPTS_DIR)/bootstrap-dev.sh; $(SCRIPTS_DIR)/bootstrap-dev.sh"

run-fixtures:
	docker-compose exec backend bash -c "cd src; ./manage.py runscript run_fixtures"
