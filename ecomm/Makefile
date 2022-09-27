include .env

publish:
	echo "Publishing subgraph ${SUBGRAPH_NAME} to Apollo Registry..."
	@APOLLO_KEY=${APOLLO_KEY} rover subgraph publish ${APOLLO_GRAPH_REF} --schema ./schema.graphql \
		--name ${SUBGRAPH_NAME} --routing-url ${ROUTING_URL}

check:
	echo "Checking subgraph ${SUBGRAPH_NAME} changes..."
	@APOLLO_KEY=${APOLLO_KEY} rover subgraph check ${GRAPH_ID} \
		--schema=schema.graphql \
		--name=${SUBGRAPH_NAME} --validation-period=4weeks

build-docker:
	docker build . -t ${SUBGRAPH_NAME}

run-docker:
	docker run ${SUBGRAPH_NAME}

run-local:
	nodemon -e js,graphql --exec 'make publish && PORT=9003 node server.js'
