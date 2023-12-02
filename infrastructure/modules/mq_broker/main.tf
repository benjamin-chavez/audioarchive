# infrastructure/modules/mq_broker/main.tf

# infrastructure/modules/mq_broker/main.tf

/*============================
        AWS MQ BROKER
==============================*/

# resource "aws_security_group" "security_group_mq_broker" {
#   name        = "mq-broker-security-group"
#   description = "Security group for MQ Broker with restricted access"
#   vpc_id      = module.networking.aws_vpc


#   ingress {
#     from_port       = 5672
#     to_port         = 5672
#     protocol        = "tcp"
#     cidr_blocks     = ["0.0.0.0/0"]
#     security_groups = [var.ecs_fargate_security_group_id]
#   }

#   ingress {
#     from_port       = 22
#     to_port         = 22
#     protocol        = "tcp"
#     cidr_blocks     = ["0.0.0.0/0"]
#     security_groups = [var.bastion_host_security_group_id]
#   }

#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
# }

resource "aws_mq_broker" "mq_broker" {
  broker_name = module.ssm_parameters.aws_mq_username.arn

  configuration {
    id       = aws_mq_configuration.test.id
    revision = aws_mq_configuration.test.latest_revision
  }

  engine_type        = "RabbitMQ"
  engine_version     = "3.11.20"
  host_instance_type = "mq.t3.micro"
  security_groups    = [aws_security_group.security_group_mq_broker.id]
  subnet_ids = [
    "subnet-06b649e2e682b95d1"
  ]

  auto_minor_version_upgrade = true
  deployment_mode            = "SINGLE_INSTANCE"
  storage_type               = "ebs"

  # logs       = ""

  encryption_options {
    use_aws_owned_key = true
  }

  apply_immediately   = true
  publicly_accessible = var.publicly_accessible

  user {
    username = module.ssm_parameters.aws_mq_username.arn
    password = module.ssm_parameters.aws_mq_password.arn
  }
}
