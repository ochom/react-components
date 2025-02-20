SHELL:=/bin/bash

build:
	npm run build

deploy:
	npx auto-version --patch && npm run deploy
 
tidy:
	npm i