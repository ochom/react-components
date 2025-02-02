SHELL:=/bin/bash

build:
	yarn install; yarn run rollup

deploy:
	npx auto-version --patch && yarn run deploy

push:
	npx auto-version --patch && git add . && git commit -am "auto-version" && git push origin dev && gh pr create --web

story:
	yarn run storybook

tidy:
	yarn install