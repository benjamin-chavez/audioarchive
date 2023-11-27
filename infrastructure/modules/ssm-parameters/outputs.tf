# infrastructure/modules/ssm-parameters/outputs.tf

output "github_token" {
  value       = data.aws_ssm_parameter.github_token.value
  description = "GitHub Token from SSM"
}

output "node_env" {
  value       = data.aws_ssm_parameter.node_env.value
  description = "Node Environment from SSM"
}

output "db_name" {
  value       = data.aws_ssm_parameter.db_name.value
  description = "Database Name from SSM"
}

output "db_password" {
  value       = data.aws_ssm_parameter.db_password.value
  description = "Database Password from SSM"
  sensitive   = true
}

output "db_user" {
  value       = data.aws_ssm_parameter.db_user.value
  description = "Database User from SSM"
}


output "auth0_audience" {
  value       = data.aws_ssm_parameter.auth0_audience.value
  description = "Auth0 Audience from SSM"
}

output "auth0_base_url" {
  value       = data.aws_ssm_parameter.auth0_base_url.value
  description = "Auth0 Base URL from SSM"
}

output "auth0_client_id" {
  value       = data.aws_ssm_parameter.auth0_client_id.value
  description = "Auth0 Client ID from SSM"
}

output "auth0_client_secret" {
  value       = data.aws_ssm_parameter.auth0_client_secret.value
  description = "Auth0 Client Secret from SSM"
  sensitive   = true
}

output "auth0_issuer_base_url" {
  value       = data.aws_ssm_parameter.auth0_issuer_base_url.value
  description = "Auth0 Issuer Base URL from SSM"
}

output "auth0_scope" {
  value       = data.aws_ssm_parameter.auth0_scope.value
  description = "Auth0 Scope from SSM"
}

output "auth0_secret" {
  value       = data.aws_ssm_parameter.auth0_secret.value
  description = "Auth0 Secret from SSM"
  sensitive   = true
}

output "aws_access_key" {
  value       = data.aws_ssm_parameter.aws_access_key.value
  description = "AWS Access Key from SSM"
  sensitive   = true
}

output "aws_bucket_name" {
  value       = data.aws_ssm_parameter.aws_bucket_name.value
  description = "AWS Bucket Name from SSM"
}

output "aws_bucket_region" {
  value       = data.aws_ssm_parameter.aws_bucket_region.value
  description = "AWS Bucket Region from SSM"
}

output "aws_secret_key" {
  value       = data.aws_ssm_parameter.aws_secret_key.value
  description = "AWS Secret Key from SSM"
  sensitive   = true
}

output "database_host" {
  value       = data.aws_ssm_parameter.database_host.value
  description = "Database Host from SSM"
}

output "database_password" {
  value       = data.aws_ssm_parameter.database_password.value
  description = "Database Password from SSM"
  sensitive   = true
}

output "database_port" {
  value       = data.aws_ssm_parameter.database_port.value
  description = "Database Port from SSM"
}

output "database_user" {
  value       = data.aws_ssm_parameter.database_user.value
  description = "Database User from SSM"
}

output "stripe_publishable_key" {
  value       = data.aws_ssm_parameter.stripe_publishable_key.value
  description = "Stripe Publishable Key from SSM"
}

output "stripe_secret_key" {
  value       = data.aws_ssm_parameter.stripe_secret_key.value
  description = "Stripe Secret Key from SSM"
  sensitive   = true
}

output "stripe_webhook_secret" {
  value       = data.aws_ssm_parameter.stripe_webhook_secret.value
  description = "Stripe Webhook Secret from SSM"
  sensitive   = true
}

output "use_local_db_tunnel" {
  value       = data.aws_ssm_parameter.use_local_db_tunnel.value
  description = "Flag for Using Local DB Tunnel from SSM"
}

output "next_public_company_name" {
  value       = data.aws_ssm_parameter.next_public_company_name.value
  description = "Public Company/Application name for Next.js"
}

# -------  SSM NEXT_PUBLIC_API_URL -------
output "next_public_api_url" {
  value       = data.aws_ssm_parameter.next_public_api_url.value
  description = "Public API URL for Next.js"
}
