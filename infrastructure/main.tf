# infrastructure/main.tf

/*===========================
          Root file
============================*/

# ------- Providers -------
provider "aws" {
  profile = var.aws_profile
  region  = var.aws_region

  # provider level tags - yet inconsistent when executing
  # default_tags {
  #   tags = {
  #     Created_by = "Terraform"
  #     Project    = "AWS_demo_fullstack_devops"
  #   }
  # }
}

# ------- Random numbers intended to be used as unique identifiers for resources -------
resource "random_id" "RANDOM_ID" {
  byte_length = "2"
}

# ------- Account ID -------
data "aws_caller_identity" "id_current_account" {}

# resource "aws_secretsmanager_secret" "production_secret" {
#   name = "my_production_secret"
# }

# resource "aws_secretsmanager_secret_version" "production_secret_version" {
#   secret_id     = aws_secretsmanager_secret.production_secret.id
#   secret_string = "{\"NEXT_PUBLIC_COMPANY_NAME\":\"value1\",\"NEXT_PUBLIC_API_URL\":\"value2\", ...}"
# }

# data "aws_secretsmanager_secret" "auth0_secret" {
#   name = "AUTH0_SECRET"
# }

# data "aws_secretsmanager_secret" "next_public_api_url" {
#   name = "NEXT_PUBLIC_API_URL"
# }
# data "aws_secretsmanager_secret" "next_public_company_name" {
#   name = "NEXT_PUBLIC_COMPANY_NAME"
# }
data "aws_secretsmanager_secret" "auth0_scope" {
  name = "AUTH0_SCOPE"
}

# -------  SSM AUTH0_AUDIENCE -------
data "aws_ssm_parameter" "auth0_audience" {
  name = "/audioarchive/production/server/AUTH0_AUDIENCE"
}

# -------  SSM AUTH0_BASE_URL -------
data "aws_ssm_parameter" "auth0_base_url" {
  name = "/audioarchive/production/server/AUTH0_BASE_URL"
}

# -------  SSM AUTH0_CLIENT_ID -------
data "aws_ssm_parameter" "auth0_client_id" {
  name = "/audioarchive/production/server/AUTH0_CLIENT_ID"
}

# -------  SSM AUTH0_CLIENT_SECRET -------
data "aws_ssm_parameter" "auth0_client_secret" {
  name            = "/audioarchive/production/server/AUTH0_CLIENT_SECRET"
  with_decryption = true
}

# -------  SSM AUTH0_ISSUER_BASE_URL -------
data "aws_ssm_parameter" "auth0_issuer_base_url" {
  name = "/audioarchive/production/server/AUTH0_ISSUER_BASE_URL"
}

# -------  SSM AUTH0_SCOPE -------
# data "aws_ssm_parameter" "auth0_scope" {
#   name = "/audioarchive/production/server/AUTH0_SCOPE"
# }

# -------  SSM AUTH0_SECRET -------
data "aws_ssm_parameter" "auth0_secret" {
  name            = "/audioarchive/production/server/AUTH0_SECRET"
  with_decryption = true
}
# data "aws_secretsmanager_secret" "auth0_audience" {
#   name = "AUTH0_AUDIENCE"
# }
# data "aws_secretsmanager_secret" "auth0_client_secret" {
#   name = "AUTH0_CLIENT_SECRET"
# }
# data "aws_secretsmanager_secret" "auth0_client_id" {
#   name = "AUTH0_CLIENT_ID"
# }
# data "aws_secretsmanager_secret" "auth0_issuer_base_url" {
#   name = "AUTH0_ISSUER_BASE_URL"
# }
# data "aws_secretsmanager_secret" "auth0_base_url" {
#   name = "AUTH0_BASE_URL"
# }

module "ssm_parameters" {
  source = "./modules/ssm-parameters"
  # Pass any required variables if needed
}

# -------  SSM GitHub Token -------
data "aws_ssm_parameter" "github_token" {
  name = "/${var.app_name}/github_token"
}

# -------  SSM NODE_ENV-------
data "aws_ssm_parameter" "node_env" {
  name = "/${var.app_name}/config/node_env"
}


# -------  SSM DATABASE_HOST-------
# data "aws_ssm_parameter" "db_host" {
#   name = "/audioarchive/production/server/DATABASE_HOST"
# }

# -------  SSM DATABASE_NAME-------
# data "aws_ssm_parameter" "db_name" {
#   name = "/audioarchive/production/server/DATABASE_NAME"
#   # name = "postgres"
# }

# -------  SSM DATABASE_PASSWORD-------
data "aws_ssm_parameter" "db_password" {
  name = "/audioarchive/production/server/DATABASE_PASSWORD"
}

# -------  SSM DATABASE_PORT-------
# data "aws_ssm_parameter" "db_port" {
#   name = "/audioarchive/production/server/DATABASE_PORT"
# }

# -------  SSM DATABASE_USER-------
data "aws_ssm_parameter" "db_user" {
  name = "/audioarchive/production/server/DATABASE_USER"
}

# ------- Networking -------
module "networking" {
  source = "./modules/networking"
  cidr   = ["10.120.0.0/16"]
  name   = var.environment_name
}

# ------- Creating Target Group for the server ALB blue environment -------
module "target_group_server_blue" {
  source              = "./modules/alb"
  create_target_group = true
  name                = "tg-${var.environment_name}-s-b"
  port                = 80
  protocol            = "HTTP"
  vpc                 = module.networking.aws_vpc
  tg_type             = "ip"
  health_check_path   = "/api/health"
  health_check_port   = var.port_app_server
}

# ------- Creating Target Group for the server ALB green environment -------
module "target_group_server_green" {
  source              = "./modules/alb"
  create_target_group = true
  name                = "tg-${var.environment_name}-s-g"
  port                = 80
  protocol            = "HTTP"
  vpc                 = module.networking.aws_vpc
  tg_type             = "ip"
  health_check_path   = "/api/health"
  health_check_port   = var.port_app_server
}

# ------- Creating Target Group for the client ALB blue environment -------
module "target_group_client_blue" {
  source              = "./modules/alb"
  create_target_group = true
  name                = "tg-${var.environment_name}-c-b"
  port                = 80
  # port              = 3000
  protocol          = "HTTP"
  vpc               = module.networking.aws_vpc
  tg_type           = "ip"
  health_check_path = "/"
  health_check_port = var.port_app_client
}

# ------- Creating Target Group for the client ALB green environment -------
module "target_group_client_green" {
  source              = "./modules/alb"
  create_target_group = true
  name                = "tg-${var.environment_name}-c-g"
  port                = 80
  # port              = 3000
  protocol          = "HTTP"
  vpc               = module.networking.aws_vpc
  tg_type           = "ip"
  health_check_path = "/"
  health_check_port = var.port_app_client
}

# ------- Creating Security Group for the server ALB -------
module "security_group_alb_server" {
  source              = "./modules/security-group"
  name                = "alb-${var.environment_name}-server"
  description         = "Controls access to the server ALB"
  vpc_id              = module.networking.aws_vpc
  cidr_blocks_ingress = ["0.0.0.0/0"]
  ingress_port        = 80
}

# ------- Creating Security Group for the client ALB -------
module "security_group_alb_client" {
  source              = "./modules/security-group"
  name                = "alb-${var.environment_name}-client"
  description         = "Controls access to the client ALB"
  vpc_id              = module.networking.aws_vpc
  cidr_blocks_ingress = ["0.0.0.0/0"]
  ingress_port        = 80
}

# ------- Creating Server Application ALB -------
# module "alb_server" {
#   source       = "./modules/alb"
#   create_alb   = true
#   enable_https = true
#   name         = "${var.environment_name}-ser"
#   subnets = [
#     module.networking.public_subnets[0],
#     module.networking.public_subnets[1]
#   ]
#   security_group = module.security_group_alb_server.sg_id
#   target_group   = module.target_group_server_blue.arn_tg
# }

# ------- Creating Client Application ALB -------
module "alb_client" {
  source       = "./modules/alb"
  create_alb   = true
  enable_https = true
  name         = "${var.environment_name}-cli"
  subnets = [
    module.networking.public_subnets[0],
    module.networking.public_subnets[1]
  ]
  security_group = module.security_group_alb_client.sg_id
  target_group   = module.target_group_client_blue.arn_tg
}

# terraform import aws_route53_record.my_record Z03559123CZF1EZ8Q3C7O_audioarchive.benchavez.xyz_A


# import {
#   to = aws_route53_record.subdomain_a_record
#   # id = "Z03559123CZF1EZ8Q3C7O"
#   id = "Z03559123CZF1EZ8Q3C7O_audioarchive.benchavez.xyz_A"
# }

# ------- Creating Route 53 Subdomains -------
resource "aws_route53_record" "subdomain_a_record_main" {
  zone_id = "Z03559123CZF1EZ8Q3C7O"
  name    = "audioarchive.benchavez.xyz"
  type    = "A"

  alias {
    name    = module.alb_client.dns_alb
    zone_id = module.alb_client.alb_zone_id

    evaluate_target_health = true
  }
}

resource "aws_route53_record" "subdomain_a_record_api" {
  zone_id = "Z03559123CZF1EZ8Q3C7O"
  name    = "api.audioarchive.benchavez.xyz"
  type    = "A"

  alias {
    name    = module.alb_client.dns_alb
    zone_id = module.alb_client.alb_zone_id

    evaluate_target_health = true
  }
}

# ------- ECS Role -------
module "ecs_role" {
  source             = "./modules/iam"
  create_ecs_role    = true
  name               = var.iam_role_name["ecs"]
  name_ecs_task_role = var.iam_role_name["ecs_task_role"]
}

# ------- Creating a IAM Policy for role -------
module "ecs_role_policy" {
  source        = "./modules/iam"
  name          = "ecs-ecr-${var.environment_name}"
  create_policy = true
  attach_to     = module.ecs_role.name_role
}

# ------- Creating server ECR Repository to store Docker Images -------
module "ecr_server" {
  source = "./modules/ecr"
  name   = "repo-server"
}

# ------- Creating client ECR Repository to store Docker Images -------
module "ecr_client" {
  source = "./modules/ecr"
  name   = "repo-client"
}

# ------- Creating ECS Task Definition for the server -------
module "ecs_task_definition_server" {
  source             = "./modules/ecs/task-definition"
  name               = "${var.environment_name}-server"
  container_name     = var.container_name["server"]
  execution_role_arn = module.ecs_role.arn_role
  task_role_arn      = module.ecs_role.arn_role_ecs_task_role
  cpu                = 256
  memory             = "512"
  docker_repo        = module.ecr_server.ecr_repository_url
  region             = var.aws_region
  container_port     = var.port_app_server
  node_env           = var.node_env
}

# ------- Creating ECS Task Definition for the client -------
module "ecs_task_definition_client" {
  source             = "./modules/ecs/task-definition"
  name               = "${var.environment_name}-client"
  container_name     = var.container_name["client"]
  execution_role_arn = module.ecs_role.arn_role
  task_role_arn      = module.ecs_role.arn_role_ecs_task_role
  cpu                = 256
  memory             = "512"
  docker_repo        = module.ecr_client.ecr_repository_url
  region             = var.aws_region
  container_port     = var.port_app_client
  node_env           = var.node_env
  secrets = [
    # {
    #   name      = "AUTH0_SECRET",
    #   valueFrom = data.aws_secretsmanager_secret.auth0_secret.arn
    # },
    # {
    #   name      = "NEXT_PUBLIC_API_URL",
    #   valueFrom = data.aws_secretsmanager_secret.next_public_api_url.arn
    # },
    # {
    #   name      = "NEXT_PUBLIC_COMPANY_NAME",
    #   valueFrom = data.aws_secretsmanager_secret.next_public_company_name.arn
    # },
    {
      name      = "AUTH0_SCOPE",
      valueFrom = data.aws_secretsmanager_secret.auth0_scope.arn
    },
    # {
    #   name      = "AUTH0_AUDIENCE",
    #   valueFrom = data.aws_secretsmanager_secret.auth0_audience.arn
    # },
    # {
    #   name      = "AUTH0_CLIENT_SECRET",
    #   valueFrom = data.aws_secretsmanager_secret.auth0_client_secret.arn
    # },
    # {
    #   name      = "AUTH0_CLIENT_ID",
    #   valueFrom = data.aws_secretsmanager_secret.auth0_client_id.arn
    # },
    # {
    #   name      = "AUTH0_ISSUER_BASE_URL",
    #   valueFrom = data.aws_secretsmanager_secret.auth0_issuer_base_url.arn
    # },
    # {
    #   name      = "AUTH0_BASE_URL",
    #   valueFrom = data.aws_secretsmanager_secret.auth0_base_url.arn
    # }
  ]
}

# ------- Creating ECS Task Definition for the Database Migrations -------
module "ecs_task_definition_db_migrate_seed" {
  source = "./modules/ecs/task-definition"
  name   = "${var.environment_name}-db-migrate-seed"
  # container_name     = var.container_name["server"]
  container_name     = "Container-migrations-seed"
  execution_role_arn = module.ecs_role.arn_role
  task_role_arn      = module.ecs_role.arn_role_ecs_task_role
  cpu                = 256
  memory             = "512"
  docker_repo        = module.ecr_server.ecr_repository_url
  region             = var.aws_region
  container_port     = var.port_app_server
  node_env           = var.node_env
  command            = ["/bin/sh", "-c", "cd /app/apps/server/dist && npx knex migrate:latest && npx knex seed:run"]
}

# ------- Creating Security Group for ECS TASKS (Server) -------
module "security_group_ecs_task_server" {
  source       = "./modules/security-group"
  name         = "ecs-task-${var.environment_name}-server"
  description  = "Controls access to the server ECS task"
  vpc_id       = module.networking.aws_vpc
  ingress_port = var.port_app_server
  security_groups = [
    # module.security_group_alb_server.sg_id
    module.security_group_alb_client.sg_id
  ]
}

# ------- Creating Security Group for ECS TASKS (Client) -------
module "security_group_ecs_task_client" {
  source       = "./modules/security-group"
  name         = "ecs-task-${var.environment_name}-client"
  description  = "Controls access to the client ECS task"
  vpc_id       = module.networking.aws_vpc
  ingress_port = var.port_app_client
  security_groups = [
    module.security_group_alb_client.sg_id
  ]
}

# ------- Creating ECS Cluster -------
module "ecs_cluster" {
  source = "./modules/ecs/cluster"
  name   = var.environment_name
}

# ------- Creating ECS Service server -------
module "ecs_service_server" {
  # depends_on          = [module.alb_server]
  depends_on          = [module.alb_client]
  source              = "./modules/ecs/service"
  name                = "${var.environment_name}-server"
  desired_tasks       = 1
  arn_security_group  = module.security_group_ecs_task_server.sg_id
  ecs_cluster_id      = module.ecs_cluster.ecs_cluster_id
  arn_target_group    = module.target_group_server_blue.arn_tg
  arn_task_definition = module.ecs_task_definition_server.arn_task_definition
  subnets_id = [
    module.networking.private_subnets_server[0],
    module.networking.private_subnets_server[1],
  ]
  container_port = var.port_app_server
  container_name = var.container_name["server"]
}

# ------- Creating ECS Service client -------
module "ecs_service_client" {
  depends_on          = [module.alb_client]
  source              = "./modules/ecs/service"
  name                = "${var.environment_name}-client"
  desired_tasks       = 1
  arn_security_group  = module.security_group_ecs_task_client.sg_id
  ecs_cluster_id      = module.ecs_cluster.ecs_cluster_id
  arn_target_group    = module.target_group_client_blue.arn_tg
  arn_task_definition = module.ecs_task_definition_client.arn_task_definition
  subnets_id = [
    module.networking.private_subnets_client[0],
    module.networking.private_subnets_client[1],
  ]
  container_port = var.port_app_client
  container_name = var.container_name["client"]
}

# ------- Creating ECS Autoscaling policies for the server application -------
module "ecs_autoscaling_server" {
  depends_on   = [module.ecs_service_server]
  source       = "./modules/ecs/autoscaling"
  name         = "${var.environment_name}-server"
  cluster_name = module.ecs_cluster.ecs_cluster_name
  min_capacity = 1
  max_capacity = 10
}

# ------- Creating ECS Autoscaling policies for the client application -------
module "ecs_autoscaling_client" {
  depends_on   = [module.ecs_service_client]
  source       = "./modules/ecs/autoscaling"
  name         = "${var.environment_name}-client"
  cluster_name = module.ecs_cluster.ecs_cluster_name
  min_capacity = 1
  max_capacity = 10
}

# ------- ALB Listener Rules Module -------
# HTTP Listener Rule for Client
resource "aws_alb_listener_rule" "http_client_rule" {
  listener_arn = module.alb_client.arn_listener # Replace with your HTTP listener ARN
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = module.target_group_client_blue.arn_tg
  }

  condition {
    host_header {
      values = ["audioarchive.benchavez.xyz"]
    }
  }
}

# HTTP Listener Rule for Server
resource "aws_alb_listener_rule" "http_server_rule" {
  listener_arn = module.alb_client.arn_listener # Replace with your HTTP listener ARN
  priority     = 200

  action {
    type             = "forward"
    target_group_arn = module.target_group_server_blue.arn_tg
  }

  condition {
    host_header {
      values = ["api.audioarchive.benchavez.xyz"]
    }
  }
}

# ------- CodePipeline -------

# ------- Creating Bucket to store CodePipeline artifacts -------
module "s3_codepipeline" {
  source      = "./modules/s3"
  bucket_name = "codepipeline-${var.aws_region}-${random_id.RANDOM_ID.hex}"
}

# ------- Creating Bucket to store CodePipeline artifacts -------
module "s3_codebuild_cache" {
  source      = "./modules/s3"
  bucket_name = "codebuild-cache-${var.aws_region}-${random_id.RANDOM_ID.hex}"
}

# ------- Creating IAM roles used during the pipeline excecution -------
module "devops_role" {
  source             = "./modules/iam"
  create_devops_role = true
  name               = var.iam_role_name["devops"]
}

module "codedeploy_role" {
  source                 = "./modules/iam"
  create_codedeploy_role = true
  name                   = var.iam_role_name["codedeploy"]
}

# ------- Creating an IAM Policy for role -------
module "policy_devops_role" {
  source               = "./modules/iam"
  name                 = "devops-${var.environment_name}"
  create_policy        = true
  attach_to            = module.devops_role.name_role
  create_devops_policy = true
  ecr_repositories = [
    module.ecr_server.ecr_repository_arn,
    module.ecr_client.ecr_repository_arn
  ]
  code_build_projects = [
    module.codebuild_client.project_arn,
    module.codebuild_server.project_arn
  ]
  code_deploy_resources = [
    module.codedeploy_server.application_arn,
    module.codedeploy_server.deployment_group_arn,
    module.codedeploy_client.application_arn,
    module.codedeploy_client.deployment_group_arn
  ]
}

# ------- Creating a SNS topic -------
module "sns" {
  source   = "./modules/sns"
  sns_name = "sns-${var.environment_name}"
}

# ------- Creating the server CodeBuild project -------
module "codebuild_server" {
  source                 = "./modules/codebuild"
  name                   = "codebuild-${var.environment_name}-server"
  iam_role               = module.devops_role.arn_role
  region                 = var.aws_region
  account_id             = data.aws_caller_identity.id_current_account.account_id
  ecr_repo_url           = module.ecr_server.ecr_repository_url
  folder_path            = var.folder_path_server
  buildspec_path         = var.buildspec_path
  task_definition_family = module.ecs_task_definition_server.task_definition_family
  container_name         = var.container_name["server"]
  auth0_scope            = data.aws_secretsmanager_secret.auth0_scope.arn
  auth0_audience         = data.aws_ssm_parameter.auth0_audience.arn
  auth0_base_url         = data.aws_ssm_parameter.auth0_base_url.arn
  auth0_client_id        = data.aws_ssm_parameter.auth0_client_id.arn
  auth0_client_secret    = data.aws_ssm_parameter.auth0_client_secret.arn
  auth0_issuer_base_url  = data.aws_ssm_parameter.auth0_issuer_base_url.arn
  # auth0_scope            = data.aws_ssm_parameter.auth0_scope.arn
  auth0_secret          = data.aws_ssm_parameter.auth0_secret.arn
  service_port          = var.port_app_server
  ecs_role              = var.iam_role_name["ecs"]
  ecs_task_role         = var.iam_role_name["ecs_task_role"]
  s3_bucket_build_cache = module.s3_codebuild_cache.s3_bucket_id
}

# ------- Creating the client CodeBuild project -------
module "codebuild_client" {
  source                 = "./modules/codebuild"
  name                   = "codebuild-${var.environment_name}-client"
  iam_role               = module.devops_role.arn_role
  region                 = var.aws_region
  account_id             = data.aws_caller_identity.id_current_account.account_id
  ecr_repo_url           = module.ecr_client.ecr_repository_url
  folder_path            = var.folder_path_client
  buildspec_path         = var.buildspec_path
  task_definition_family = module.ecs_task_definition_client.task_definition_family
  container_name         = var.container_name["client"]
  auth0_scope            = data.aws_secretsmanager_secret.auth0_scope.arn
  auth0_audience         = data.aws_ssm_parameter.auth0_audience.arn
  auth0_base_url         = data.aws_ssm_parameter.auth0_base_url.arn
  auth0_client_id        = data.aws_ssm_parameter.auth0_client_id.arn
  auth0_client_secret    = data.aws_ssm_parameter.auth0_client_secret.arn
  auth0_issuer_base_url  = data.aws_ssm_parameter.auth0_issuer_base_url.arn
  # auth0_scope            = data.aws_ssm_parameter.auth0_scope.arn
  auth0_secret = data.aws_ssm_parameter.auth0_secret.arn
  service_port = var.port_app_client
  ecs_role     = var.iam_role_name["ecs"]
  # server_alb_url         = module.alb_server.dns_alb
  server_alb_url        = module.alb_client.dns_alb
  s3_bucket_build_cache = module.s3_codebuild_cache.s3_bucket_id
}

# ------- Creating the server CodeDeploy project -------
module "codedeploy_server" {
  source      = "./modules/codedeploy"
  name        = "Deploy-${var.environment_name}-server"
  ecs_cluster = module.ecs_cluster.ecs_cluster_name
  ecs_service = module.ecs_service_server.ecs_service_name
  # alb_listener    = module.alb_server.arn_listener
  alb_listener    = module.alb_client.arn_listener
  tg_blue         = module.target_group_server_blue.tg_name
  tg_green        = module.target_group_server_green.tg_name
  sns_topic_arn   = module.sns.sns_arn
  codedeploy_role = module.codedeploy_role.arn_role_codedeploy
}

# ------- Creating the client CodeDeploy project -------
module "codedeploy_client" {
  source          = "./modules/codedeploy"
  name            = "Deploy-${var.environment_name}-client"
  ecs_cluster     = module.ecs_cluster.ecs_cluster_name
  ecs_service     = module.ecs_service_client.ecs_service_name
  alb_listener    = module.alb_client.arn_listener
  tg_blue         = module.target_group_client_blue.tg_name
  tg_green        = module.target_group_client_green.tg_name
  sns_topic_arn   = module.sns.sns_arn
  codedeploy_role = module.codedeploy_role.arn_role_codedeploy
}

# ------- Creating CodePipeline -------
module "codepipeline" {
  source    = "./modules/codepipeline"
  name      = "pipeline-${var.environment_name}"
  pipe_role = module.devops_role.arn_role
  s3_bucket = module.s3_codepipeline.s3_bucket_id
  # github_token             = module.ssm_parameters.github_token
  github_token             = data.aws_ssm_parameter.github_token.value
  repo_owner               = var.repository_owner
  repo_name                = var.repository_name
  branch                   = var.repository_branch
  codebuild_project_server = module.codebuild_server.project_id
  codebuild_project_client = module.codebuild_client.project_id
  app_name_server          = module.codedeploy_server.application_name
  app_name_client          = module.codedeploy_client.application_name
  deployment_group_server  = module.codedeploy_server.deployment_group_name
  deployment_group_client  = module.codedeploy_client.deployment_group_name

  depends_on = [module.policy_devops_role]
}

# ------- Creating Bucket to store assets accessed by the Back-end -------
module "s3_assets" {
  source      = "./modules/s3"
  bucket_name = "assets-${var.aws_region}-${random_id.RANDOM_ID.hex}"
}

# ------- Creating Security Group for EC2 Bastion Host -------
resource "aws_security_group" "security_group_ec2_bastion" {
  name        = "security_group_bastion_host"
  description = "Controls access to the EC2 Bastion Host"
  vpc_id      = module.networking.aws_vpc

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # count = var.create_bastion_host ? 1 : 0
}

# ------- Creating EC2 Bastion Host -------
resource "aws_instance" "ec2-bastion-host" {
  ami           = "ami-0e83be366243f524a"
  instance_type = "t2.micro"
  key_name      = "us-east-2-key"
  subnet_id     = module.networking.public_subnets[0]
  # vpc_security_group_ids = [aws_security_group.security_group_ec2_bastion[0].id]
  vpc_security_group_ids = [aws_security_group.security_group_ec2_bastion.id]

  associate_public_ip_address = true
  # metadata_options {
  #   http_endpoint               = "enabled"
  #   http_put_response_hop_limit = 1
  #   http_tokens                 = "required"
  # }

  depends_on = [
    module.networking.public_subnets,
    aws_security_group.security_group_ec2_bastion
  ]
  tags = {
    Name = "ec2-bastion-${var.environment_name}"
  }

  count = var.create_bastion_host ? 1 : 0
}

# ------- Creating Security Group for the Database -------
module "security_group_rds_db" {
  source              = "./modules/security-group"
  name                = "rds-${var.environment_name}-db"
  description         = "Controls access to the RDS Database"
  vpc_id              = module.networking.aws_vpc
  cidr_blocks_ingress = ["0.0.0.0/0"]
  ingress_port        = 5432

  security_groups = concat([
    module.security_group_alb_server.sg_id,
    module.security_group_alb_client.sg_id,
    module.security_group_ecs_task_server.sg_id,
    module.security_group_ecs_task_client.sg_id,
    aws_security_group.security_group_ec2_bastion.id
  ])
  # ], var.create_bastion_host ? [aws_security_group.security_group_ec2_bastion.id] : [])
  # ], var.create_bastion_host ? [aws_security_group.security_group_ec2_bastion[0].id] : [])
}

# ------- Database Module -------
module "psql_rds" {
  # db_name           = data.aws_ssm_parameter.db_name.value
  # password               = data.aws_ssm_parameter.db_password.value
  source            = "./modules/rds"
  create            = true
  identifier        = "audio-archive-psql-db2"
  engine_version    = "15.4"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  storage_type      = "gp2"
  storage_encrypted = false
  kms_key_id        = "your-kms-key-id"
  # db_name                = module.ssm_parameters.db_name
  # password               = module.ssm_parameters.db_password
  db_name = "postgres"
  # password               = var.db_password
  # db_name                = data.aws_ssm_parameter.db_name.value
  password               = data.aws_ssm_parameter.db_password.value
  vpc_id                 = module.networking.aws_vpc
  vpc_security_group_ids = [module.security_group_rds_db.sg_id]
  db_subnet_group_name   = module.networking.database_subnet_group_name
  parameter_group_name   = "default.postgres15"
  publicly_accessible    = true
  deletion_protection    = false
  db_user                = data.aws_ssm_parameter.db_user.value
  # db_user                = module.ssm_parameters.db_user

  depends_on = [
    # module.networking.aws_vpc,
    module.security_group_rds_db,
    module.networking.database_subnet_group_name,
  ]
}
