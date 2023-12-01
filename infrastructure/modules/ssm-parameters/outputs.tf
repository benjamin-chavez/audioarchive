# infrastructure/modules/ssm-parameters/outputs.tf
output "github_token_arn" {
  value       = data.aws_ssm_parameter.github_token.arn
  description = "The GitHub token from SSM."
  sensitive   = true
}

output "node_env_arn" {
  value       = data.aws_ssm_parameter.node_env.arn
  description = "The NODE_ENV value from SSM."
}

output "client_url_arn" {
  value       = data.aws_ssm_parameter.client_url.arn
  description = "The CLIENT_URL value from SSM."
}

output "use_local_db_tunnel_arn" {
  value       = data.aws_ssm_parameter.use_local_db_tunnel.arn
  description = "Flag to use local DB tunnel from SSM."
}

output "db_user" {
  value       = data.aws_ssm_parameter.db_user.value
  description = "The database user from SSM."
}

output "db_user_arn" {
  value       = data.aws_ssm_parameter.db_user.arn
  description = "The database user ARN from SSM."
}

output "db_password" {
  value       = data.aws_ssm_parameter.db_password.value
  description = "The database password from SSM."
  sensitive   = true
}

output "db_password_arn" {
  value       = data.aws_ssm_parameter.db_password.arn
  description = "The database password ARN from SSM."
  sensitive   = true
}

output "db_host_arn" {
  value       = data.aws_ssm_parameter.db_host.arn
  description = "The database host from SSM."
}

output "db_port_arn" {
  value       = data.aws_ssm_parameter.db_port.arn
  description = "The database port from SSM."
}

output "db_name_arn" {
  value       = data.aws_ssm_parameter.db_name.arn
  description = "The database name from SSM."
}

output "auth0_audience_arn" {
  value       = data.aws_ssm_parameter.auth0_audience.arn
  description = "The Auth0 audience value from SSM."
}

output "auth0_base_url_arn" {
  value       = data.aws_ssm_parameter.auth0_base_url.arn
  description = "The Auth0 base URL from SSM."
}

output "auth0_client_id_arn" {
  value       = data.aws_ssm_parameter.auth0_client_id.arn
  description = "The Auth0 client ID from SSM."
}

output "auth0_client_secret_arn" {
  value       = data.aws_ssm_parameter.auth0_client_secret.arn
  description = "The Auth0 client secret from SSM."
  sensitive   = true
}

output "auth0_issuer_base_url_arn" {
  value       = data.aws_ssm_parameter.auth0_issuer_base_url.arn
  description = "The Auth0 issuer base URL from SSM."
}

output "auth0_scope_arn" {
  value       = data.aws_ssm_parameter.auth0_scope.arn
  description = "The Auth0 scope from SSM."
}

output "auth0_secret_arn" {
  value       = data.aws_ssm_parameter.auth0_secret.arn
  description = "The Auth0 secret from SSM."
  sensitive   = true
}

output "stripe_publishable_key_arn" {
  value       = data.aws_ssm_parameter.stripe_publishable_key.arn
  description = "The Stripe publishable key from SSM."
}

output "stripe_secret_key_arn" {
  value       = data.aws_ssm_parameter.stripe_secret_key.arn
  description = "The Stripe secret key from SSM."
  sensitive   = true
}

output "stripe_webhook_secret_arn" {
  value       = data.aws_ssm_parameter.stripe_webhook_secret.arn
  description = "The Stripe webhook secret from SSM."
  sensitive   = true
}

output "aws_mq_username_arn" {
  value       = data.aws_ssm_parameter.aws_mq_username.arn
  description = "The AWS MQ username from SSM."
}

output "aws_mq_password_arn" {
  value       = data.aws_ssm_parameter.aws_mq_password.arn
  description = "The AWS MQ password from SSM."
  sensitive   = true
}

output "aws_mq_broker_url_arn" {
  value       = data.aws_ssm_parameter.aws_mq_broker_url.arn
  description = "The AWS MQ broker URL from SSM."
}

output "aws_mq_port_arn" {
  value       = data.aws_ssm_parameter.aws_mq_port.arn
  description = "The AWS MQ port from SSM."
}
