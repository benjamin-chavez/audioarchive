# infrastructure/scripts/bastion-bootstrap.sh

#!/bin/bash

# update packages
sudo yum update --all -y
# install packages
sudo yum install readline-devel openssl-devel -y
# install postgresql
sudo dnf install postgresql15 -y
