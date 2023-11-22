


terraform {
  required_version = ">= 1.6"
  required_providers {
    aws = {
      source = "hashicorp/aws"
      # version = "~> 3.38"
      version = "~> 5.26.0"

    }
  }
}
