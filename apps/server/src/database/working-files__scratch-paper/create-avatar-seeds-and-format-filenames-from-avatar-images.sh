#!/bin/bash

# EXAMPLE USE:
#   ./create-avatar-seeds-and-format-filenames-from-avatar-images.sh ./seed-assets/app-user-avatars/

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

echo "[" >app-user-seed-data.json

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
      echo "," >>app-user-seed-data.json
    fi

    # Write to app-user-seed-data.json
    echo "  {" >>app-user-seed-data.json
    echo "    \"auth_id\": \"auth0|$(openssl rand -hex 12)\"," >>app-user-seed-data.json
    echo "    \"display_name\": \"$display_name\"," >>app-user-seed-data.json

    if [[ "$display_name" =~ \  ]]; then
      echo "    \"first_name\": \"$(cut -d' ' -f1 <<<"$display_name")\"," >>app-user-seed-data.json
      echo "    \"last_name\": \"$(cut -d' ' -f2- <<<"$display_name")\"," >>app-user-seed-data.json
    else
      echo "    \"first_name\": \"$display_name\"," >>app-user-seed-data.json
      echo "    \"last_name\": \"\"," >>app-user-seed-data.json
    fi

    echo "    \"username\": \"$username\"," >>app-user-seed-data.json
    echo "    \"email\": \"${username}@faker-mail.dev\"," >>app-user-seed-data.json
    echo "    \"avatarS3Key\": \"$avatarS3Key\"," >>app-user-seed-data.json
    echo "    \"created_at\": \"currentTimestamp\"," >>app-user-seed-data.json
    echo "    \"updated_at\": \"currentTimestamp\"" >>app-user-seed-data.json
    echo "  }" >>app-user-seed-data.json
  fi

  # File renaming logic
  source_file="$file"
  target_file="${directory}/${avatarS3Key}"

  if [ "$source_file" != "$target_file" ]; then
    mv -- "$source_file" "$target_file"
  fi
done

echo "]" >>app-user-seed-data.json
