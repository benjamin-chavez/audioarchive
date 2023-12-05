#!/bin/bash

echo "[" >seedfile.json

first=true

for file in *; do
  if [ -d "$file" ] || [ "$file" == *.sh ]; then
    continue
  fi

  base=${file%.*}
  extension=${file##*.}
  # display_name="${base/-/ }"
  display_name="$base"
  username="${base/-/}"
  username=$(echo "$username" | tr '[:upper:]' '[:lower:]')

  if [[ "$base" == *banner* ]]; then
    avatarS3Key=$(echo "$base" | sed 's/ /-/g' | tr '[:upper:]' '[:lower:]')-seed.${extension}
    # nubase=$(echo "$base" | sed 's/ /-/g' | tr '[:upper:]' '[:lower:]' | sed 's|-banner||g')-banner-seed
  else
    avatarS3Key="${username}-avatar-seed.${extension}"

    # avatarS3Key="${nubase}.${extension}"

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
    echo "    \"first_name\": \"$(cut -d' ' -f1 <<<"$display_name")\"," >>seedfile.json
    echo "    \"last_name\": \"$(cut -d' ' -f2- <<<"$display_name")\"," >>seedfile.json
    echo "    \"username\": \"$username\"," >>seedfile.json
    echo "    \"email\": \"${username}@faker-mail.dev\"," >>seedfile.json
    echo "    \"avatarS3Key\": \"$avatarS3Key\"," >>seedfile.json
    echo "    \"created_at\": \"currentTimestamp\"," >>seedfile.json
    echo "    \"updated_at\": \"currentTimestamp\"" >>seedfile.json
    echo "  }" >>seedfile.json
  fi

  # File renaming logic
  if [ "$file" != "$avatarS3Key" ]; then
    mv -- "$file" "$avatarS3Key"
  fi
done

echo "]" >>seedfile.json
