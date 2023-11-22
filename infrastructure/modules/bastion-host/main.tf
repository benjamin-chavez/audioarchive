# infrastructure/modules/bastion-host/main.tf

## Generate PEM (and OpenSSH) formatted private key.
resource "tls_private_key" "ec2-bastion-host-key-pair" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

## Create the file for Public Key
resource "local_file" "ec2-bastion-host-public-key" {
  depends_on = [tls_private_key.ec2-bastion-host-key-pair]
  content    = tls_private_key.ec2-bastion-host-key-pair.public_key_openssh
  filename   = var.ec2-bastion-public-key-path
}

## Create the sensitive file for Private Key
resource "local_sensitive_file" "ec2-bastion-host-private-key" {
  depends_on      = [tls_private_key.ec2-bastion-host-key-pair]
  content         = tls_private_key.ec2-bastion-host-key-pair.private_key_pem
  filename        = var.ec2-bastion-private-key-path
  file_permission = "0600"
}

## AWS SSH Key Pair
resource "aws_key_pair" "ec2-bastion-host-key-pair" {
  depends_on = [local_file.ec2-bastion-host-public-key]
  key_name   = "${var.project}-ec2-bastion-host-key-pair-${var.environment}"
  public_key = tls_private_key.ec2-bastion-host-key-pair.public_key_openssh
}

# ## AWS SSH Key Pair
# resource "aws_key_pair" "ec2-bastion-host-key-pair" {
#   key_name = "${var.project}-ec2-bastion-host-key-pair-${var.environment}"
#   public_key = file(var.ec2-bastion-public-key-path)
# }

resource "aws_security_group" "ec2-bastion-sg" {
  description = "EC2 Bastion Host Security Group"
  name        = "${var.project}-ec2-bastion-sg-${var.environment}"
  vpc_id      = var.vpc_id
  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
    # cidr_blocks = [var.ec2-bastion-ingress-ip-1]
    cidr_blocks = ["0.0.0.0/0"]
    description = "Open to Public Internet"
  }
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    ipv6_cidr_blocks = ["::/0"]
    description      = "IPv6 route Open to Public Internet"
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "IPv4 route Open to Public Internet"
  }
}

# module "security_group_bastion" {
#   source              = "./modules/security-group"
#   name                = "bastion-sg${var.environment_name}"
#   description         = "Controls access to the Bastion Host"
#   vpc_id              = module.networking.aws_vpc
#   cidr_blocks_ingress = ["0.0.0.0/0"]
#   ingress_port        = 22
#   egress_port         = 0

#   # count = var.include_bastion_host ? 1 : 0
# }


# # ------- Creating Security Group from RDS to the Bastion Host -------
# module "security_group_bastion_to_rds" {
#   source              = "./modules/security-group"
#   name                = "bastion-to-rds-${var.environment_name}"
#   description         = "Controls access to the Bastion Host"
#   vpc_id              = module.networking.aws_vpc
#   cidr_blocks_ingress = ["0.0.0.0/0"]
#   ingress_port        = 5432
#   egress_port         = 5432
#   security_groups = [
#     module.security_group_bastion.sg_id
#   ]


#   # count = var.include_bastion_host ? 1 : 0
# }

## EC2 Bastion Host Elastic IP
resource "aws_eip" "ec2-bastion-host-eip" {
  vpc = true
  tags = {
    Name = "${var.project}-ec2-bastion-host-eip-${var.environment}"
  }
}


# resource "aws_instance" "bastion_host" {
#   ami           = ""
#   instance_type = "t2.micro" # Change as per your requirements
#   key_name      = "my-key"   # SSH Key pair name

#   # Assuming you have a public subnet in your VPC
#   subnet_id = var.public_subnet_id


#   # Security group for the Bastion Host
#   vpc_security_group_ids = [aws_security_group.bastion_sg.id]

#   tags = {
#     Name = "BastionHost"
#   }
# }

data "aws_ami" "amazon_linux_ami" {
  most_recent = true
  owners      = ["amazon"]
  filter {
    name   = "name"
    values = ["amzn2-ami-kernel-*-gp2"]
  }
  filter {
    name   = "root-device-type"
    values = ["ebs"]
  }
  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}


resource "aws_instance" "ec2-bastion-host" {
  # ami                         = "ami-0d76271a8a1525c1a"
  ami                         = data.aws_ami.amazon_linux_ami.id
  instance_type               = "t2.micro"
  key_name                    = aws_key_pair.ec2-bastion-host-key-pair.key_name
  vpc_security_group_ids      = [aws_security_group.ec2-bastion-sg.id]
  subnet_id                   = var.public_subnet_id
  associate_public_ip_address = false
  # user_data                   = file(var.bastion-bootstrap-script-path)
  # user_data = file("./bastion-bootstrap.sh")
  root_block_device {
    volume_size           = 8
    delete_on_termination = true
    volume_type           = "gp2"
    encrypted             = true
    tags = {
      Name = "${var.project}-ec2-bastion-host-root-volume-${var.environment}"
    }
  }
  credit_specification {
    cpu_credits = "standard"
  }
  tags = {
    Name = "${var.project}-ec2-bastion-host-${var.environment}"
  }
  lifecycle {
    ignore_changes = [
      associate_public_ip_address,
    ]
  }
}


## EC2 Bastion Host Elastic IP Association
resource "aws_eip_association" "ec2-bastion-host-eip-association" {
  instance_id   = aws_instance.ec2-bastion-host.id
  allocation_id = aws_eip.ec2-bastion-host-eip.id
}
