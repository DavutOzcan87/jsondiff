#!/bin/bash
version=1.0

docker tag jsondiff davutozcan/jsondiff:"$version"
docker push davutozcan/jsondiff:"$version"

echo "DONE"