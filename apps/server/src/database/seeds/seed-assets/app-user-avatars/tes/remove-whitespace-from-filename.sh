#!/bin/bash

for file in *; do
  newname=$(echo "file" | sed 's/ /-/g')

  if [ "$file" != "$newname" ]; then
    mv "$file" "$newname"
  fi
done
