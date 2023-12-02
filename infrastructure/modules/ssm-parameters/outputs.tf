# infrastructure/modules/ssm-parameters/outputs.tf
output "github_token" {
  value       = data.aws_ssm_parameter.github_token
  description = "The GitHub token from SSM."
  sensitive   = true
}

output "node_env" {
  value       = data.aws_ssm_parameter.node_env
  description = "The NODE_ENV value from SSM."
}

output "client_url" {
  value       = data.aws_ssm_parameter.client_url
  description = "The CLIENT_URL value from SSM."
}

output "use_local_db_tunnel" {
  value       = data.aws_ssm_parameter.use_local_db_tunnel
  description = "Flag to use local DB tunnel from SSM."
}

output "db_user" {
  value       = data.aws_ssm_parameter.db_user
  description = "The database user from SSM."
}

output "db_password" {
  value       = data.aws_ssm_parameter.db_password
  description = "The database password from SSM."
  sensitive   = true
}

output "db_host" {
  value       = data.aws_ssm_parameter.db_host
  description = "The database host from SSM."
}

output "db_port" {
  value       = data.aws_ssm_parameter.db_port
  description = "The database port from SSM."
}

output "db_name" {
  value       = data.aws_ssm_parameter.db_name
  description = "The database name from SSM."
}

output "auth0_audience" {
  value       = data.aws_ssm_parameter.auth0_audience
  description = "The Auth0 audience value from SSM."
}

output "auth0_base_url" {
  value       = data.aws_ssm_parameter.auth0_base_url
  description = "The Auth0 base URL from SSM."
}

output "auth0_client_id" {
  value       = data.aws_ssm_parameter.auth0_client_id
  description = "The Auth0 client ID from SSM."
}

output "auth0_client_secret" {
  value       = data.aws_ssm_parameter.auth0_client_secret
  description = "The Auth0 client secret from SSM."
  sensitive   = true
}

output "auth0_issuer_base_url" {
  value       = data.aws_ssm_parameter.auth0_issuer_base_url
  description = "The Auth0 issuer base URL from SSM."
}

output "auth0_scope" {
  value       = data.aws_ssm_parameter.auth0_scope
  description = "The Auth0 scope from SSM."
}

output "auth0_secret" {
  value       = data.aws_ssm_parameter.auth0_secret
  description = "The Auth0 secret from SSM."
  sensitive   = true
}

output "stripe_publishable_key" {
  value       = data.aws_ssm_parameter.stripe_publishable_key
  description = "The Stripe publishable key from SSM."
}

output "stripe_secret_key" {
  value       = data.aws_ssm_parameter.stripe_secret_key
  description = "The Stripe secret key from SSM."
  sensitive   = true
}

output "stripe_webhook_secret" {
  value       = data.aws_ssm_parameter.stripe_webhook_secret
  description = "The Stripe webhook secret from SSM."
  sensitive   = true
}

output "aws_mq_username" {
  value       = data.aws_ssm_parameter.aws_mq_username
  description = "The AWS MQ username from SSM."
}

output "aws_mq_password" {
  value       = data.aws_ssm_parameter.aws_mq_password
  description = "The AWS MQ password from SSM."
  sensitive   = true
}

output "aws_mq_broker_url" {
  value       = data.aws_ssm_parameter.aws_mq_broker_url
  description = "The AWS MQ broker URL from SSM."
}

output "aws_mq_port" {
  value       = data.aws_ssm_parameter.aws_mq_port
  description = "The AWS MQ port from SSM."
}
