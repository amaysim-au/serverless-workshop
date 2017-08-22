PACKAGE_DIR=package/package
ARTIFACT_NAME=package.zip
ARTIFACT_PATH=package/$(ARTIFACT_NAME)
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

build: $(DOTENV_TARGET)
	docker-compose run --rm serverless make _deps _build

deploy: $(ARTIFACT_PATH) $(DOTENV_TARGET)
	docker-compose run --rm serverless make _deploy

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
	rm -fr package
	mkdir -p $(PACKAGE_DIR)/
	cp package.json $(PACKAGE_DIR)/
	cp yarn.lock $(PACKAGE_DIR)/
	./node_modules/babel-cli/bin/babel.js src --out-dir $(PACKAGE_DIR)/dist
	cd $(PACKAGE_DIR) && yarn install --production
	cd $(PACKAGE_DIR) && zip -rq ../package .

_deploy:
	rm -fr .serverless
	sls deploy -v

_remove:
	sls remove -v
	rm -fr .serverless

_deps:
	yarn install

_clean:
	rm -fr .serverless node_modules package .env