# infrastructure/modules/bastion-auto/main.tf
locals {
  name = "audio-archive"
  tags = "audio-archive"
}

# For latest AMI ID for Amazon OS
# https://registry.terraform.io/providers/hashicorp/aws/3.36.0/docs/data-sources/ami
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


# Security Group for Public Bastion Host
# https://registry.terraform.io/modules/terraform-aws-modules/security-group/aws/latest
module "bastion_instance_sg" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "5.1.0"

  name        = "bastion-instance-sg-${local.name}"
  description = "SSH port open, egress ports are all world open"
  vpc_id      = var.vpc_id

  # List of ingress rules and CIDR Block
  ingress_rules       = ["ssh-tcp"]
  ingress_cidr_blocks = ["0.0.0.0/0"]

  # List of egress rules to create by name open to all-all
  egress_rules = ["all-all"]
  # tags         = local.tags
}



# Terraform Module for Bastion instance - bastion Instance that will be created in VPC Public Subnet
# https://registry.terraform.io/modules/terraform-aws-modules/ec2-instance/aws/latest
module "ec2_bastion_instance" {
  source                 = "terraform-aws-modules/ec2-instance/aws"
  version                = "5.2.0"
  name                   = "Bastion-Instance-${local.name}"
  ami                    = data.aws_ami.amazon_linux_ami.id
  instance_type          = var.instance_type
  subnet_id              = var.public_subnet_id
  vpc_security_group_ids = [module.bastion_instance_sg.security_group_id]
  key_name               = var.instance_keypair
  # tags                   = local.tags
  depends_on = [
    # module.vpc
  ]
}


# Elastic IP for Bastion Instance
# https://registry.terraform.io/providers/hashicorp/aws/2.42.0/docs/resources/eip
resource "aws_eip" "bastion_instance_eip" {
  #   vpc      = true
  domain   = "vpc" # vpc argument to the aws_eip resource is deprecated
  instance = module.ec2_bastion_instance.id
  # tags     = local.tags
  depends_on = [
    module.ec2_bastion_instance,
    # module.vpc
  ]
}



# Create a Null Resource and Provisioners to copy key to ec2_bastion_instance
# https://registry.terraform.io/providers/hashicorp/null/latest/docs/resources/resource
resource "null_resource" "keys_to_ec2_bastion_instance" {

  # Connection Block for Provisioners to connect to Bastion Instance
  connection {
    type        = "ssh"
    host        = aws_eip.bastion_instance_eip.public_ip
    user        = "ec2-user"
    password    = ""
    private_key = file("aws-key/aws-terraform-key.pem")
  }

  # File Provisioner - copy the aws-terraform-key.pem file to /tmp/aws-terraform-key.pem
  provisioner "file" {
    source      = "aws-key/aws-terraform-key.pem"
    destination = "tmp/aws-terraform-key.pem"
  }
  ## Remote-Exec Provisioner-  Update the key permissions on Bastion Instance
  provisioner "remote-exec" {
    inline = [
      "sudo chmod 400 tmp/aws-terraform-key.pem"
    ]
  }
  depends_on = [
    module.ec2_bastion_instance
  ]
}
