SHELL:=/bin/bash

dev:
	npm run dev

build:
	npm run build

deploy:
	npx auto-version --patch && npm run build && npm run deploy
 
tidy:
	npm install