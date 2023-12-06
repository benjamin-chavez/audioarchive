

curl --http1.1 -X "POST" -H "Authorization: Basic ZDVmOTUxMTA4ZWRmNDczOTgzMDA5NzViNmE4MThhM2U6NjM0ZTg5MDZlYTNiNGYwZmE5OWUwYTNhOGEyM2NlZTY=" -d grant_type=client_credentials https://accounts.spotify.com/api/token

curl -X "GET" "https://api.spotify.com/v1/artists/ARTIST_ID" -H "Authorization: Bearer ZDVmOTUxMTA4ZWRmNDczOTgzMDA5NzViNmE4MThhM2U6NjM0ZTg5MDZlYTNiNGYwZmE5OWUwYTNhOGEyM2NlZTY"


curl --request GET \
  --url 'https://api.spotify.com/v1/audio-features/6uoVKMfX6e1NcwZbzT584Y?market=US' \
  --header 'Authorization: Bearer ZDVmOTUxMTA4ZWRmNDczOTgzMDA5NzViNmE4MThhM2U6NjM0ZTg5MDZlYTNiNGYwZmE5OWUwYTNhOGEyM2NlZTY'

  curl --request GET \
  --url 'https://api.spotify.com/v1/audio-features/6uoVKMfX6e1NcwZbzT584Y' \
  --header 'Authorization: Bearer <AUTH_TOKEN>'


curl --request GET \
  --url 'https://api.spotify.com/v1/audio-features/6uoVKMfX6e1NcwZbzT584Y' \
  --header 'Authorization: Bearer <AUTH_TOKEN>'


curl --request GET \
  --url 'https://api.spotify.com/v1/tracks/6uoVKMfX6e1NcwZbzT584Y' \
  --header 'Authorization: Bearer <AUTH_TOKEN>'

curl --request GET \
  --url 'https://api.spotify.com/v1/artists/7o7mC95EDbJKTcPAAs8C3r' \
  --header 'Authorization: Bearer <AUTH_TOKEN>'


# SEARCH
curl --request GET \
  --url 'https://api.spotify.com/v1/search?q=borgore&type=artist' \
  --header 'Authorization: Bearer <AUTH_TOKEN>'

  curl --request GET \
  --url 'https://api.spotify.com/v1/search?q=amin+chavez&type=artist&limit=10&offset=1' \
  --header 'Authorization: Bearer <AUTH_TOKEN>'
