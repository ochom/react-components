SHELL:=/bin/bash

dev:
	bun run dev

build:
	bun run build

deploy:
	npx auto-version --patch && bun run build && bun run deploy
 
tidy:
	bun install