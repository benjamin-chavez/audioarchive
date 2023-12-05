#!/bin/bash

# Check for `directory` command line arg
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <directory>"
  exit 1
fi

directory=$1

# Check if the provided argument is a directory
if [ ! -d "$directory" ]; then
  echo "Error: $directory is not a valid directory"
  exit 1
fi

echo "[" >seedfile.json

first=true

for file in "$directory"/*; do
  if [ -d "$file" ] || [[ "$file" == *.sh ]] || [[ "$file" == *.json ]]; then
    continue
  fi

  base=$(basename "$file")
  base=${base%.*}
  extension=${file##*.}
  display_name="$base"
  username=$(echo "$base" | sed 's/ /-/g' | tr '[:upper:]' '[:lower:]')

  # Set avatarS3Key based on whether 'banner' is in the file name
  if [[ "$base" == *banner* ]]; then
    avatarS3Key="${username}-seed.${extension}"
  else
    avatarS3Key="${username}-avatar-seed.${extension}"

    # Handle comma for JSON formatting
    if [ "$first" = true ]; then
      first=false
    else
      echo "," >>seedfile.json
    fi

    # Write to seedfile.json
    echo "  {" >>seedfile.json
    echo "    \"auth_id\": \"auth0|$(openssl rand -hex 12)\"," >>seedfile.json
    echo "    \"display_name\": \"$display_name\"," >>seedfile.json

    if [[ "$display_name" =~ \  ]]; then
      echo "    \"first_name\": \"$(cut -d' ' -f1 <<<"$display_name")\"," >>seedfile.json
      echo "    \"last_name\": \"$(cut -d' ' -f2- <<<"$display_name")\"," >>seedfile.json
    else
      echo "    \"first_name\": \"$display_name\"," >>seedfile.json
      echo "    \"last_name\": \"\"," >>seedfile.json
    fi

    echo "    \"username\": \"$username\"," >>seedfile.json
    echo "    \"email\": \"${username}@faker-mail.dev\"," >>seedfile.json
    echo "    \"avatarS3Key\": \"$avatarS3Key\"," >>seedfile.json
    echo "    \"created_at\": \"currentTimestamp\"," >>seedfile.json
    echo "    \"updated_at\": \"currentTimestamp\"" >>seedfile.json
    echo "  }" >>seedfile.json
  fi

  # File renaming logic
  source_file="$file"
  target_file="${directory}/${avatarS3Key}"

  if [ "$source_file" != "$target_file" ]; then
    mv -- "$source_file" "$target_file"
  fi
done

echo "]" >>seedfile.json
