

variable "name" {
  description = "Name of the application"
  type        = string
}

variable "region" {
  description = "Region for the DigitalOcean resources"
  type        = string
}

variable "do_token" {
  description = "DigitalOcean API token"
  type        = string
}


variable "logtail_source_name" {
  description = "Logtail Name for the application logs"
  type        = string
}

variable "logtail_source_token" {
  description = "Logtail Token for the application logs"
  type        = string
}

variable "npm_token" {
  description = "NPM token for the build / deployment process"
  type        = string
}


variable "config_file" {
  description = "Path to the configuration file"
  type        = string
}

variable "source_dir_static" {
  description = "Source directory for the static application"
  type        = string
}

variable "deploy_on_push" {
  description = "Whether to deploy on push to the GitHub repository"
  type        = bool
  default     = false
}

variable "instance_count" {
  description = "Number of instances for the API service"
  type        = number
}

variable "instance_size_slug" {
  description = "Instance size slug for the API service"
  type        = string
}

variable "dockerfile_path" {
  description = "Path to the Dockerfile for the API service"
  type        = string
}

variable "api_url" {
  description = "API URL for the application"
  type        = string
}

variable "source_dir_api" {
  description = "Source directory for the API application"
  type        = string
}

variable "api_http_port" {
  description = "HTTP port for the API service"
  type        = number
}


variable "static_build_command" {
  description = "Build command for the static app"
  type        = string
}

variable "catchall_document" {
  description = "Default document for static server"
  type        = string
}

variable "environment_slug" {
  description = "Environment slug for the application"
  type        = string
}

variable "gh_repository" {
  description = "GitHub repository for the application"
  type        = string
}

variable "branch" {
  description = "Branch of the GitHub repository"
  type        = string
}

variable "env_vars" {
  description = "Environment variables for the application"
  type = list(object({
    key   = string
    value = string
  }))
}
