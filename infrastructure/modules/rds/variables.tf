# infrastructure/modules/rds/variables.tf

variable "create" {
  description = "A boolean flag to determine whether the RDS instance should be created."
  type        = bool
}

variable "identifier" {
  description = "Unique identifier for the RDS instance."
  type        = string
}

variable "engine_version" {
  description = "Version of the Postgres engine to be used."
  type        = string
}

variable "instance_class" {
  description = "The compute and memory capacity of the RDS instance."
  type        = string
}

variable "allocated_storage" {
  description = "The amount of storage to allocate for the RDS instance (in GB)."
  type        = number
}

variable "storage_type" {
  description = "Type of storage to be attached to the RDS instance (e.g., gp2, io1, etc.)."
  type        = string
}

variable "storage_encrypted" {
  description = "A boolean flag to determine whether the RDS storage should be encrypted."
  type        = bool
}

variable "kms_key_id" {
  description = "The ARN of the KMS key for storage encryption. Required if storage_encrypted is set to true."
  type        = string
}

variable "db_name" {
  description = "Name of the initial database to be created inside the RDS instance."
  type        = string
}

variable "password" {
  description = "Password for the master (postgres) user."
  type        = string
}

variable "vpc_id" {
  description = "VPC ID where the RDS instance will reside."
  type        = string
}

variable "vpc_security_group_ids" {
  description = "List of security group IDs to be associated with the RDS instance."
  type        = list(string)
}

variable "db_subnet_group_name" {
  description = "Name of the DB subnet group to associate with the RDS instance."
  type        = string
}

variable "parameter_group_name" {
  description = "Name of the DB parameter group to associate with the RDS instance."
  type        = string
}

variable "publicly_accessible" {
  description = "A boolean flag to determine whether the RDS instance should be publicly accessible."
  type        = bool
}

variable "deletion_protection" {
  description = "A boolean flag to enable or disable deletion protection for the RDS instance."
  type        = bool
}

variable "db_user" {
  description = "Database user"
  type        = string
}
