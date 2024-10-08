variable "config_file" {
  description = "Path to the configuration file"
  type        = string
  default     = "../../../api/config/config.staging.sh"
}


variable "do_token" {
  description = "DigitalOcean API token"
  type        = string
  default     = "autoreplace_do_token"
}

variable "logtail_source_token" {
  description = "Logtail Token for the application logs"
  type        = string
  default     = ""
}

variable "github_token" {
  description = "Github token for the build / deployment process"
  type        = string
  default     = "autoreplace_github_token"
}
