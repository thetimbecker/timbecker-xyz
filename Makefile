all: build deploy

build:
	umi build

deploy:
	aws s3 sync dist s3://timbecker.xyz --delete
