# infrastructure/modules/parameter-store.tf

resource "aws_ssm_parameter" "database_password_parameter2" {
  name        = "/production/database/password/master2"
  description = "Production environment database password"
  type        = "SecureString"
  value       = random_password.database_password.result
}

resource "aws_iam_role_policy" "password_policy_parameterstore" {
  name = "password-policy-parameterstore"
  role = aws_iam_role.ecs_task_execution_role2.id

  policy = <<-EOF
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Action": [
          "ssm:GetParameters"
        ],
        "Effect": "Allow",
        "Resource": [
          "*"
        ]
      }
    ]
  }
  EOF
}

data "template_file" "task_template_parameterstore" {
  template = file("./templates/task.json.tpl")

  vars = {
    app_cpu           = var.cpu
    app_memory        = var.memory
    database_password = aws_ssm_parameter.database_password_parameter2.arn
  }
}

resource "aws_ecs_task_definition" "task_definition_parameterstore" {
  family                   = "task-parameterstore"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role2.arn
  requires_compatibilities = ["EC2"]
  cpu                      = var.cpu
  memory                   = var.memory
  network_mode             = "awsvpc"
  container_definitions    = data.template_file.task_template_parameterstore.rendered
}
