# infrastructure/modules/rds/outputs.tf

output "rds_endpoint" {
  description = "The connection endpoint for the RDS instance."
  value       = aws_db_instance.psql_rds[0].endpoint
}

output "rds_instance_arn" {
  description = "The ARN of the RDS instance."
  value       = aws_db_instance.psql_rds[0].arn
}

output "rds_instance_port" {
  description = "The port of the RDS instance."
  value       = aws_db_instance.psql_rds[0].port
}

output "database_name" {
  description = "The database name of the RDS instance."
  value       = aws_db_instance.psql_rds[0].db_name
}

output "database_username" {
  description = "The master username for the RDS instance."
  value       = aws_db_instance.psql_rds[0].username
}
