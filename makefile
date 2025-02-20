SHELL:=/bin/bash

build:
	bun run build

deploy:
	npx auto-version --patch && bun run build && bun run deploy
 
tidy:
	bun install