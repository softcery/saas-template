terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }

  backend "s3" {
    endpoint                    = "fra1.digitaloceanspaces.com"
    region                      = "us-west-1"
    bucket                      = "saas-template-space"
    key                         = "staging_terraform.tfstate"
    skip_credentials_validation = true
    skip_metadata_api_check     = true
  }
}

# Configure the DigitalOcean Provider
provider "digitalocean" {
  token = var.do_token
}

module "env_config" {
  source      = "../../modules/env-config"
  config_file = var.config_file # Pass the dev-specific config file path
}

module "saas_template_app" {
  source                = "../../modules/app"
  name                 = "stag-saas-template"
  region               = "lon"
  source_dir_static    = "./web"
  source_dir_api       = "./api"
  environment_slug     = "node-js"
  config_file          = var.config_file
  api_url              = "https://stag-saas-template-46ccu.ondigitalocean.app/api"
  catchall_document    = "index.html"
  static_build_command = "pnpm run build:digitalocean"
  gh_repository        = "softcery/saas-template"
  branch               = "staging"
  deploy_on_push       = false
  do_token             = var.do_token
  github_token        = var.github_token
  api_http_port        = 8080
  instance_count       = 1
  instance_size_slug   = "apps-s-1vcpu-1gb"
  dockerfile_path      = "api/Dockerfile"

  # Use env_vars from the env-config module
  env_vars = module.env_config.env_vars

  logtail_source_name  = "detectdata-staging-logtail"
  logtail_source_token = var.logtail_source_token
}
