
output "application_url" {
  description = "Copy this value in your browser in order to access the deployed app"
  value       = module.alb_client.dns_alb
}

# output "swagger_endpoint" {
#   value       = "${module.alb_server.dns_alb}/api/docs"
#   description = "Copy this value in your browser in order to access the swagger documentation"
# }

output "api_endpoint" {
  description = "test api_endpoint"
  # value       = "${module.alb_server.dns_alb}/api"
  value = "${module.alb_client.dns_alb}/api"
}

output "ec2_instance_public_dns" {
  description = "The public DNS name of the EC2 instance"
  value       = var.create_bastion_host ? aws_instance.ec2-bastion-host[0].public_dns : ""
}

output "rds_endpoint" {
  description = "The connection endpoint for the RDS instance."
  value       = module.psql_rds.rds_endpoint
}


output "ssh_tunnel_command" {
  description = "Use this command to set up an SSH tunnel for secure connections."
  value       = var.create_bastion_host ? "ssh -L 5432:${module.psql_rds.rds_endpoint} ubuntu@${aws_instance.ec2-bastion-host[0].public_dns} -i ${var.aws_key_path}" : ""
}

output "ssh_ec2_connect_command" {
  value       = var.create_bastion_host ? "ssh -i \"${var.aws_key_path}\" ubuntu@${aws_instance.ec2-bastion-host[0].public_dns}" : ""
  description = "Use this command to connect to the EC2 Instance."
}

# output "psql_connect_command" {
#   value       = "psql -h ${module.psql_rds.rds_endpoint} -U ${var.db_user} -d ${var.db_password}"
#   description = "Use this command to connect to the RDS Database."

#   sensitive = false
# }
