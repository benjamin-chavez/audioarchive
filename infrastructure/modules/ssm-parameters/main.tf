# infrastructure/modules/ssm-parameters/main.tf

/*=================================================
         Amazon EC2 Simple Systems Manager
===================================================*/


# -------  SSM GitHub Token -------
data "aws_ssm_parameter" "github_token" {
  # name = "/${var.app_name}/github_token"
  name = "/audioarchive/github_token"
}

# -------  SSM NODE_ENV-------
data "aws_ssm_parameter" "node_env" {
  name = "/audioarchive/config/node_env"
}

# -------  SSM DATABASE_NAME -------
data "aws_ssm_parameter" "db_name" {
  name = "/audioarchive/production/server/DATABASE_NAME"
}

# -------  SSM DATABASE_PASSWORD -------
data "aws_ssm_parameter" "db_password" {
  name            = "/audioarchive/production/server/DATABASE_PASSWORD"
  with_decryption = true
}

# -------  SSM DATABASE_USER -------
data "aws_ssm_parameter" "db_user" {
  name = "/audioarchive/production/server/DATABASE_USER"
}

# -------  SSM AUTH0_AUDIENCE -------
data "aws_ssm_parameter" "auth0_audience" {
  name = "/audioarchive/production/server/AUTH0_AUDIENCE"
}

# -------  SSM AUTH0_BASE_URL -------
data "aws_ssm_parameter" "auth0_base_url" {
  name = "/audioarchive/production/server/AUTH0_BASE_URL"
}

# -------  SSM AUTH0_CLIENT_ID -------
data "aws_ssm_parameter" "auth0_client_id" {
  name = "/audioarchive/production/server/AUTH0_CLIENT_ID"
}

# -------  SSM AUTH0_CLIENT_SECRET -------
data "aws_ssm_parameter" "auth0_client_secret" {
  name            = "/audioarchive/production/server/AUTH0_CLIENT_SECRET"
  with_decryption = true
}

# -------  SSM AUTH0_ISSUER_BASE_URL -------
data "aws_ssm_parameter" "auth0_issuer_base_url" {
  name = "/audioarchive/production/server/AUTH0_ISSUER_BASE_URL"
}

# -------  SSM AUTH0_SCOPE -------
data "aws_ssm_parameter" "auth0_scope" {
  name = "/audioarchive/production/server/AUTH0_SCOPE"
}

# -------  SSM AUTH0_SECRET -------
data "aws_ssm_parameter" "auth0_secret" {
  name            = "/audioarchive/production/server/AUTH0_SECRET"
  with_decryption = true
}

# -------  SSM AWS_ACCESS_KEY -------
data "aws_ssm_parameter" "aws_access_key" {
  name            = "/audioarchive/production/server/AWS_ACCESS_KEY"
  with_decryption = true
}

# -------  SSM AWS_SECRET_KEY -------
data "aws_ssm_parameter" "aws_secret_key" {
  name            = "/audioarchive/production/server/AWS_SECRET_KEY"
  with_decryption = true
}

# -------  SSM DATABASE_HOST -------
data "aws_ssm_parameter" "database_host" {
  name = "/audioarchive/production/server/DATABASE_HOST"
}

# -------  SSM DATABASE_PASSWORD -------
data "aws_ssm_parameter" "database_password" {
  name            = "/audioarchive/production/server/DATABASE_PASSWORD"
  with_decryption = true
}

# -------  SSM DATABASE_PORT -------
data "aws_ssm_parameter" "database_port" {
  name = "/audioarchive/production/server/DATABASE_PORT"
}
#
# -------  SSM DATABASE_USER -------
data "aws_ssm_parameter" "database_user" {
  name = "/audioarchive/production/server/DATABASE_USER"
}

# -------  SSM STRIPE_PUBLISHABLE_KEY -------
data "aws_ssm_parameter" "stripe_publishable_key" {
  name = "/audioarchive/production/server/STRIPE_PUBLISHABLE_KEY"
}

# -------  SSM STRIPE_SECRET_KEY -------
data "aws_ssm_parameter" "stripe_secret_key" {
  name            = "/audioarchive/production/server/STRIPE_SECRET_KEY"
  with_decryption = true
}

# -------  SSM STRIPE_WEBHOOK_SECRET -------
data "aws_ssm_parameter" "stripe_webhook_secret" {
  name            = "/audioarchive/production/server/STRIPE_WEBHOOK_SECRET"
  with_decryption = true
}

# -------  SSM USE_LOCAL_DB_TUNNEL -------
data "aws_ssm_parameter" "use_local_db_tunnel" {
  name = "/audioarchive/production/server/USE_LOCAL_DB_TUNNEL"
}
