# infrastructure/modules/sns/variables.tf

variable "sns_name" {
  description = "The name of the SNS topic"
  # variable "general_sns_name" {
  # description = "The name of the general SNS topic"
  type = string
}

variable "codedeploy_sns_name" {
  description = "The name of the CodeDeploy SNS topic"
  type        = string
}

variable "notification_email" {
  description = "The email address to receive notifications from the SNS topic."
  type        = string
  default     = "ben.m.chavez@gmail.com"
}
