TIMESTAMP := $$(date +%s)

build_and_deploy: build deploy

init:
	npm i

build:
	umi build
	cp assets/young-santa.png dist/young-santa.png
	mv dist/index.html dist/index.$(TIMESTAMP).html

deploy:
	aws s3 sync dist s3://timbecker.xyz
