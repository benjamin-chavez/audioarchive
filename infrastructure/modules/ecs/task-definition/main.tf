# infrastructure/modules/ecs/task-definition/main.tf

/*====================================
      AWS ECS Task definition
=====================================*/

resource "aws_ecs_task_definition" "ecs_task_definition" {
  family                   = "task-definition-${var.name}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.cpu
  memory                   = var.memory
  execution_role_arn       = var.execution_role_arn
  task_role_arn            = var.task_role_arn

  container_definitions = jsonencode([{
    name        = var.container_name
    image       = var.docker_repo
    cpu         = 0
    essential   = true
    command     = var.command
    networkMode = "awsvpc"
    portMappings = [{
      containerPort = var.container_port
      hostPort      = var.container_port
    }]
    # TODO:Review if you need this environmnent field
    environment = [
      {
        name  = "NODE_ENV"
        value = var.node_env
      },
      {
        name  = "DATABASE_HOST"
        value = "audio-archive-psql-db2.cxq8xikgucfb.us-east-2.rds.amazonaws.com"
      }
    ]
    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = "/ecs/task-definition-${var.name}"
        "awslogs-region"        = var.region
        "awslogs-stream-prefix" = "ecs"
      }
    }
  }])
}


# ------- CloudWatch Logs groups to store ecs-containers logs -------
resource "aws_cloudwatch_log_group" "TaskDF-Log_Group" {
  name              = "/ecs/task-definition-${var.name}"
  retention_in_days = 30

  # lifecycle {
  #   create_before_destroy = true
  #   ignore_changes        = [name]  # Ignore changes to the log group's name
  # }
}
