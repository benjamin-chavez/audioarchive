# infrastructure/modules/bastion-host/variables.tf

# AWS Bastion EC2 Instance Type and key pair
variable "instance_type" {
  description = "bastion Instance Type"
  type        = string
  default     = ""
}

variable "instance_keypair" {
  description = "AWS EC2 Key pair that need to be associated with bastion Instance"
  type        = string
  default     = ""
}

variable "vpc_id" {
  description = "VPC ID where the RDS instance will reside."
  type        = string
}

variable "public_subnet_id" {
  description = "Public Subnet ID for Bastion Host"
  type        = string
}
