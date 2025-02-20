SHELL:=/bin/bash

build:
	npm run build

deploy:
	npx auto-version --patch && npm run deploy

push:
	npx auto-version --patch && git add . && git commit -am "auto-version" && git push origin dev && gh pr create --web

tidy:
	npm i