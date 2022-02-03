#!/bin/bash

# Create network named 'bomi-fama' if it doesn't exist yet
NET_NAME="bomi-fama"

docker network inspect ${NET_NAME} --format {{.Id}} 2>/dev/null || docker network create --driver bridge ${NET_NAME}

docker run -it --rm -p 8080:4242 --network=${NET_NAME} --name=bomi_server hypothe/node_bomi_fama