include .env

build-docker:
	docker build . -f Dockerfile -t gateway

run-docker:
	docker run --env-file=.env gateway 

run-local:
	nodemon -e js --exec 'PORT=8000 node server.js'