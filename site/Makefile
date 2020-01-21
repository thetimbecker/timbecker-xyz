TIMESTAMP := $$(date +%s)

build_and_ship_static: build_static ship_static
build_and_ship_container: build_container ship_container

init:
	npm i

build:
	umi build
	cp assets/young-santa.png dist/young-santa.png

build_static: build
	mv dist/index.html dist/index.$(TIMESTAMP).html

ship_static:
	aws s3 sync dist s3://timbecker.xyz

cleanup_static:
	aws s3 sync dist s3://timbecker.xyz --delete

build_container: build
	docker build -t timbecker.xyz .

ship_container:
	$$(aws ecr get-login --no-include-email --region us-east-1)
	docker tag timbecker.xyz:latest 339491649918.dkr.ecr.us-east-1.amazonaws.com/timbecker.xyz:latest
	docker push 339491649918.dkr.ecr.us-east-1.amazonaws.com/timbecker.xyz:latest

