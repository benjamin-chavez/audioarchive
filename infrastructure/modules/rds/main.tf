# infrastructure/modules/rds/main.tf

/*==================================================
      AWS RELATION DATABASE SERVICE
===================================================*/

resource "aws_db_instance" "psql_rds" {
  count = var.create ? 1 : 0

  db_name           = var.db_name
  engine            = "postgres"
  engine_version    = var.engine_version
  instance_class    = var.instance_class
  allocated_storage = var.allocated_storage
  storage_type      = var.storage_type

  # manage_master_user_password = true
  # username = var.db_user
  username = "postgres"
  password = var.password
  port     = 5432

  vpc_security_group_ids = var.vpc_security_group_ids
  db_subnet_group_name   = var.db_subnet_group_name
  parameter_group_name   = var.parameter_group_name
  publicly_accessible    = var.publicly_accessible

  # maintenance_window = var.maintenance_window
  # backup_retention_period = length(var.blue_green_update) > 0 ? coalesce(var.backup_retention_period, 1) : var.backup_retention_period
  # backup_window           = var.backup_window

  # enabled_cloudwatch_logs_exports = var.enabled_cloudwatch_logs_exports
  # cloudwatch_logs_exports = ["postgresql"]

  # Encryption
  storage_encrypted = var.storage_encrypted
  # kms_key_id        = var.kms_key_id
  kms_key_id = var.storage_encrypted ? var.kms_key_id : null

  skip_final_snapshot = true

  identifier          = var.identifier
  deletion_protection = var.deletion_protection
}
