SHELL:=/bin/bash

roll:
	npm i; npm run rollup

deploy:
	npx auto-version --patch && npm run deploy

push:
	npx auto-version --patch && git add . && git commit -am "auto-version" && git push origin dev && gh pr create --web


// "@emotion/styled": "11.6.0",
// "@mui/icons-material": "^5.11.11",
// "@mui/lab": "^5.0.0-alpha.124",
// "@mui/material": "^5.11.14",
// "@mui/system": "^5.12.0",
// "@mui/x-date-pickers": "^6.0.3",