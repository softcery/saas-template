terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

# Configure the DigitalOcean Provider
provider "digitalocean" {
  token = var.do_token
}


resource "digitalocean_project" "saas_template" {
  name        = "SaaS Template"
  description = "A project for the SaaS Template application"
  purpose     = "Web Application"
  environment = "Development"
}

resource "digitalocean_app" "saas_template" {
  depends_on = [ digitalocean_project.saas_template ]
  project_id = digitalocean_project.saas_template.id
  spec {
    name   = var.name
    region = var.region


    static_site {
      name              = "${var.name}-web"
      build_command     = var.static_build_command
      source_dir        = var.source_dir_static
      environment_slug  = var.environment_slug
      catchall_document = var.catchall_document

      github {
        repo           = var.gh_repository
        deploy_on_push = var.deploy_on_push
        branch         = var.branch
      }
      env {
        key   = "API_BASE_URL"
        scope = "BUILD_TIME"
        value = var.api_url
      }
    }

    env {
      key   = "GITHUB_TOKEN"
      scope = "BUILD_TIME"
      value = var.github_token
    }

    service {
      name               = "${var.name}-api"
      source_dir         = var.source_dir_api
      instance_count     = var.instance_count
      instance_size_slug = var.instance_size_slug
      dockerfile_path    = var.dockerfile_path

      dynamic "env" {
        for_each = var.env_vars
        content {
          key   = env.value.key
          scope = "RUN_TIME"
          value = env.value.value
        }
      }

      github {
        repo           = var.gh_repository
        deploy_on_push = var.deploy_on_push
        branch         = var.branch
      }

      http_port = var.api_http_port

      health_check {
        http_path             = "/"
        initial_delay_seconds = 0
        period_seconds        = 10
        timeout_seconds       = 1
        success_threshold     = 1
        failure_threshold     = 9
        port                  = var.api_http_port
      }

      # log_destination {
      #   name = var.logtail_source_name

      #   logtail {
      #     token = var.logtail_source_token
      #   }
      # }
    }

    ingress {
      rule {
        component {
          name = "${var.name}-web"
        }

        match {
          path {
            prefix = "/"
          }
        }
      }

      rule {
        component {
          name = "${var.name}-api"
        }

        match {
          path {
            prefix = "/api"
          }
        }
      }
    }

    alert {
      rule = "DEPLOYMENT_FAILED"
    }

    alert {
      rule = "DOMAIN_FAILED"
    }
  }
}
