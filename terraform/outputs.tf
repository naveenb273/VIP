output "resource_group_name" {
  description = "The name of the resource group"
  value       = module.hackspace_base.resource_group_name
}

output "web_app_name" {
  description = "The name of the app service"
  value       = module.hackspace_base.web_app_name
}
