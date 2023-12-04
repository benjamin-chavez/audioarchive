# infrastructure/modules/codebuild/main.tf

/*==================================
      AWS CodeBuild Project
===================================*/

resource "aws_codebuild_project" "aws_codebuild" {
  name          = var.name
  description   = "Terraform codebuild project"
  build_timeout = "10"
  service_role  = var.iam_role

  artifacts {
    type = "CODEPIPELINE"
  }

  environment {
    compute_type    = "BUILD_GENERAL1_LARGE"
    image           = "aws/codebuild/amazonlinux2-x86_64-standard:4.0"
    type            = "LINUX_CONTAINER"
    privileged_mode = true

    environment_variable {
      name  = "AWS_REGION"
      value = var.region
    }

    environment_variable {
      name  = "AWS_ACCOUNT_ID"
      value = var.account_id
    }

    environment_variable {
      name  = "REPO_URL"
      value = var.ecr_repo_url
    }

    environment_variable {
      name  = "IMAGE_TAG"
      value = "latest"
    }

    environment_variable {
      name  = "TASK_DEFINITION_FAMILY"
      value = var.task_definition_family
    }

    environment_variable {
      name  = "CONTAINER_NAME"
      value = var.container_name
    }

    environment_variable {
      name  = "SERVICE_PORT"
      value = var.service_port
    }

    environment_variable {
      name  = "FOLDER_PATH"
      value = var.folder_path
    }

    environment_variable {
      name  = "ECS_ROLE"
      value = var.ecs_role
    }

    environment_variable {
      name  = "ECS_TASK_ROLE"
      value = var.ecs_task_role
    }

    environment_variable {
      name  = "SERVER_ALB_URL"
      value = var.server_alb_url
    }

    # -------  SSM CLIENT_URL -------
    environment_variable {
      name  = "CLIENT_URL"
      value = var.client_url
    }

    # -------  SSM USE_LOCAL_DB_TUNNEL -------
    environment_variable {
      name  = "USE_LOCAL_DB_TUNNEL"
      value = var.use_local_db_tunnel
    }

    # -------  SSM DB_USER -------
    environment_variable {
      name  = "DATABASE_USER"
      value = var.db_user
    }

    # -------  SSM DB_PASSWORD -------
    environment_variable {
      name  = "DATABASE_PASSWORD"
      value = var.db_password
    }

    # -------  SSM DB_HOST -------
    environment_variable {
      name  = "DATABASE_HOST"
      value = var.db_host
    }

    # -------  SSM DB_PORT -------
    environment_variable {
      name  = "DATABASE_PORT"
      value = var.db_port
    }

    # -------  SSM DB_NAME -------
    environment_variable {
      name  = "DATABASE_NAME"
      value = var.db_name
    }

    # -------  SSM AUTH0_AUDIENCE -------
    environment_variable {
      name  = "AUTH0_AUDIENCE"
      value = var.auth0_audience
    }

    # -------  SSM AUTH0_BASE_URL -------
    environment_variable {
      name  = "AUTH0_BASE_URL"
      value = var.auth0_base_url
    }

    # -------  SSM AUTH0_CLIENT_ID -------
    environment_variable {
      name  = "AUTH0_CLIENT_ID"
      value = var.auth0_client_id
    }

    # -------  SSM AUTH0_CLIENT_SECRET -------
    environment_variable {
      name  = "AUTH0_CLIENT_SECRET"
      value = var.auth0_client_secret
    }

    # -------  SSM AUTH0_ISSUER_BASE_URL -------
    environment_variable {
      name  = "AUTH0_ISSUER_BASE_URL"
      value = var.auth0_issuer_base_url
    }

    # -------  SSM AUTH0_SCOPE -------
    environment_variable {
      name  = "AUTH0_SCOPE"
      value = var.auth0_scope
    }

    # -------  SSM AUTH0_SECRET -------
    environment_variable {
      name  = "AUTH0_SECRET"
      value = var.auth0_secret
    }

    # -------  SSM STRIPE_PUBLISHABLE_KEY -------
    environment_variable {
      name  = "STRIPE_PUBLISHABLE_KEY"
      value = var.stripe_publishable_key
    }

    # -------  SSM STRIPE_SECRET_KEY -------
    environment_variable {
      name  = "STRIPE_SECRET_KEY"
      value = var.stripe_secret_key
    }

    # -------  SSM STRIPE_WEBHOOK_SECRET -------
    environment_variable {
      name  = "STRIPE_WEBHOOK_SECRET"
      value = var.stripe_webhook_secret
    }
    environment_variable {
      name  = "AWS_MQ_USERNAME"
      value = var.aws_mq_username
    }
    environment_variable {
      name  = "AWS_MQ_PASSWORD"
      value = var.aws_mq_password
    }
    environment_variable {
      name  = "AWS_MQ_BROKER_URL"
      value = var.aws_mq_broker_url
    }
    environment_variable {
      name  = "AWS_MQ_PORT"
      value = var.aws_mq_port
    }

    environment_variable {
      name  = "AWS_SQS_STRIPE_WEBHOOKS_QUEUE_URL"
      value = var.aws_sqs_stripe_q_url
    }
    environment_variable {
      name  = "AWS_SQS_STRIPE_WEBHOOKS_DLQ_URL"
      value = var.aws_sqs_stripe_dlq_url
    }
  }

  logs_config {
    cloudwatch_logs {
      group_name  = "log-group"
      stream_name = "log-stream"
    }
  }

  source {
    type      = "CODEPIPELINE"
    buildspec = var.buildspec_path
  }

  cache {
    type     = "S3"
    location = var.s3_bucket_build_cache
  }
}
