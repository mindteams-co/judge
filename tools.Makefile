define variadic_args
	$(filter-out $@,$(MAKECMDGOALS))
endef
