#!/bin/bash

version=6

docker tag jsondiff davutozcan/jsondiff:"$version"
docker push davutozcan/jsondiff:"$version"

echo "DONE"