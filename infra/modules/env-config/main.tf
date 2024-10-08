data "local_file" "config" {
  filename = var.config_file
}

locals {
  lines = split("\n", data.local_file.config.content)

  non_empty_lines = [
    for line in local.lines : trimspace(line)
    if length(trimspace(line)) > 0 && !startswith(trimspace(line), "#")
  ]

  env_vars = [
    for line in local.non_empty_lines :
    {
      key = split("=", line)[0]
      value = join("=", slice(split("=", line), 1, length(split("=", line))))
    }
    if length(split("=", line)) > 1
  ]
}

output "env_vars" {
  value = local.env_vars
}