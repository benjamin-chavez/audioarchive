# infrastructure/modules/mq_broker/variables.tf

# infrastructure/modules/mq_broker/variables.tf

variable "broker_name" {
  description = "TODO"
  type        = string
}

variable "security_groups" {
  description = "TODO"
  type        = string
}

variable "subnet_ids" {
  description = "TODO"
  type        = string
}

variable "subnets" {
  description = "TODO"
  type        = string
}

variable "publicly_accessible" {
  description = "TODO"
  type        = bool
  default     = false
}

variable "username" {
  description = "TODO"
  type        = string
}

variable "password" {
  description = "TODO"
  type        = string
}
