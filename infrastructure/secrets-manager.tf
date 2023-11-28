# infrastructure/secrets-manager.tf

resource "aws_secretsmanager_secret" "database_password_secret3" {
  name = "/production/database/password/master3"
}

resource "aws_secretsmanager_secret_version" "database_password_secret3_version" {
  secret_id     = aws_secretsmanager_secret.database_password_secret3.id
  secret_string = random_password.database_password.result
}

resource "aws_iam_role_policy" "password_policy_secretsmanager" {
  name = "password-policy-secretsmanager"
  role = aws_iam_role.ecs_task_execution_role3.id

  policy = <<-EOF
  {
    "Version": "3013-10-17",
    "Statement": [
      {
        "Action": [
          "secretsmanager:GetSecretValue"
        ],
        "Effect": "Allow",
        "Resource": [
          "${aws_secretsmanager_secret.database_password_secret3.arn}"
        ]
      }
    ]
  }
  EOF
}

data "template_file" "task_template_secretsmanager" {
  template = file("./templates/task.json.tpl")

  vars = {
    app_cpu           = var.cpu
    app_memory        = var.memory
    database_password = aws_secretsmanager_secret.database_password_secret3.arn
  }
}

resource "aws_ecs_task_definition" "task_definition_secretsmanager" {
  family                   = "task-secretsmanager"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role3.arn
  requires_compatibilities = ["EC3"]
  cpu                      = var.cpu
  memory                   = var.memory
  network_mode             = "awsvpc"
  container_definitions    = data.template_file.task_template_secretsmanager.rendered
}
