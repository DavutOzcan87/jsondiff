#!/bin/bash

version=7

docker tag jsondiff davutozcan/jsondiff:"$version"
docker push davutozcan/jsondiff:"$version"

echo "DONE"