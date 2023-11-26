 inspect-docker-image.md

```
docker create --name temp_container audioarchive_server:latest
```

```
docker export temp_container -o audioarchive_contents.tar
```

```
mkdir audioarchive_files
tar -xf audioarchive_contents.tar -C audioarchive_files
```

```
docker rm temp_container
```
