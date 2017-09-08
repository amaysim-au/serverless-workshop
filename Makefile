ifdef DOTENV
	DOTENV_TARGET=dotenv
else
	DOTENV_TARGET=.env
endif

################
# Entry Points #
################

testUnit: $(DOTENV_TARGET)
	docker-compose run --rm serverless make _deps _testUnit

deploy: $(DOTENV_TARGET)
	docker-compose run --rm serverless make _deps _build _deploy

testSys: $(DOTENV_TARGET)
	docker-compose run --rm serverless make _deps _testSys

remove: $(DOTENV_TARGET)
	docker-compose run --rm serverless make _remove

shell: $(DOTENV_TARGET)
	docker-compose run --rm serverless bash

##########
# Others #
##########
# Create .env based on .env.template if .env does not exist
.env:
	@echo "Create .env with .env.template"
	cp .env.template .env

# Create/Overwrite .env with $(DOTENV)
dotenv:
	@echo "Overwrite .env with $(DOTENV)"
	cp $(DOTENV) .env

_testUnit:
	./node_modules/mocha/bin/mocha --compilers js:babel-register test/unit

_testSys:
	./node_modules/mocha/bin/mocha --compilers js:babel-register test/system

_build:
	./node_modules/babel-cli/bin/babel.js src --out-dir dist

_deploy:
	rm -fr .serverless
	sls deploy -v

_remove:
	sls remove -v
	rm -fr .serverless

_deps:
	yarn install --no-bin-links

_clean:
	rm -fr node_modules dist .env