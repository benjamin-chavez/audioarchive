#!/bin/bash

for file in *; do
  if [ -d "$file" ]; then
    continue
  fi

  if [[ "$file" == *.sh ]]; then
    continue
  fi

  base=${file%.*}
  extension=${file##*.}

  if [[ "$base" == *banner* ]]; then
    nubase=$(echo "$base" | sed 's/ /-/g' | tr '[:upper:]' '[:lower:]' | sed 's|-banner||g')-banner-seed
    # nubase=$(echo "$base" | sed 's/ /-/g' | tr '[:upper:]' '[:lower:]' | sed 's|banner-?|banner-seed|g')
  else

    nubase=$(echo "$base" | sed 's/ /-/g' | tr '[:upper:]' '[:lower:]')-avatar-seed
  fi

  if [[ "$file" == *.* ]]; then
    nuname="${nubase}.${extension}"
  else
    nuname="${nubase}"
  fi

  if [ "$file" != "$nuname" ]; then
    mv "$file" "$nuname"
  fi
done
