# infrastructure/modules/codebuild/variables.tf

variable "name" {
  type        = string
  description = "CodeBuild Project name"
}

variable "iam_role" {
  type        = string
  description = "IAM role to attach to CodeBuild"
}
variable "region" {
  type        = string
  description = "AWS Region used"
}
variable "account_id" {
  description = "AWS Account ID where the solution is being deployed"
  type        = string
}
variable "ecr_repo_url" {
  description = "AWS ECR repository URL where docker images are being stored"
  type        = string
}

variable "folder_path" {
  description = "Folder path to use to build the docker images/containers"
  type        = string
}

variable "buildspec_path" {
  description = "Path to for the Buildspec file"
  type        = string
}

variable "task_definition_family" {
  description = "The family name of the Task definition"
  type        = string
}

variable "container_name" {
  description = "The name of the Container specified in the Task definition"
  type        = string
}

variable "service_port" {
  description = "The number of the port used by the ECS Service"
  type        = number
}

variable "ecs_role" {
  description = "The name of the ECS Task Excecution role to specify in the Task Definition"
  type        = string
}

variable "server_alb_url" {
  description = "The server ALB DNS. Used to build the code for the frontend layer"
  type        = string
  default     = ""
}

variable "ecs_task_role" {
  description = "The name of the ECS Task role to specify in the Task Definition"
  type        = string
  default     = "null"
}

variable "s3_bucket_build_cache" {
  description = "The name of the S3 bucket used for the build cache"
  type        = string
}


# variable "s3_bucket_assets" {
#   description = "The name of the S3 bucket to which grant IAM access"
#   type        = list(string)
#   default     = ["*"]
# }

# variable "s3_bucket" {
#   description = "S3 bucket used for the artifact store"
#   type        = string
# }

variable "auth0_scope" {
  description = "TODO"
  type        = string
}

variable "auth0_secret" {
  description = "TODO"
  type        = string
}
