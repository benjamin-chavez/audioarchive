# infrastructure/modules/bastion-host/variables.tf

# EC2 Bastion Host variables
variable "ec2-bastion-public-key-path" {
  type = string
}

variable "ec2-bastion-private-key-path" {
  type = string
}

variable "ec2-bastion-ingress-ip-1" {
  type = string
}

variable "vpc_id" {
  description = "VPC ID where the RDS instance will reside."
  type        = string
}


variable "public_subnet_id" {
  description = "Public Subnet ID for Bastion Host"
  type        = string
}

# security_group_id

variable "project" {
  description = "Public Subnet ID for Bastion Host"
  type        = string
  default     = "project"
}
variable "environment" {
  description = "Public Subnet ID for Bastion Host"
  type        = string
  default     = "environment"
}
