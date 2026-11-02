# Resource Group
output "resource_group_name" {
  description = "Name of the created resource group"
  value       = azurerm_resource_group.rg.name
}

output "resource_group_location" {
  description = "Location of the created resource group"
  value       = azurerm_resource_group.rg.location
}

# App Service Plan
output "app_service_plan_id" {
  description = "ID of the App Service Plan (shared or dedicated)"
  value       = local.service_plan_id
}

output "app_service_plan_name" {
  description = "Name of the App Service Plan"
  value       = local.app_service_plan_name
}

# Log Analytics
output "log_analytics_workspace_id" {
  description = "ID of the Log Analytics Workspace"
  value       = module.log_analytics.id
}

# Application Insights
output "app_insights_instrumentation_key" {
  description = "Instrumentation key for Application Insights"
  value       = module.app_insights.root.instrumentation_key
  sensitive   = true
}

output "app_insights_connection_string" {
  description = "Connection string for Application Insights"
  value       = module.app_insights.root.connection_string
  sensitive   = true
}

output "app_insights_app_id" {
  description = "App ID of Application Insights"
  value       = module.app_insights.root.app_id
}

# Networking
output "appservice_subnet_id" {
  description = "ID of the App Service subnet"
  value       = data.azurerm_subnet.appservice_subnet.id
}

output "vnet_id" {
  description = "ID of the connected VNet"
  value       = data.azurerm_virtual_network.connected_vnet.id
}

# Managed Identity (null when the identity lookup is skipped)
output "kv_reader_identity_id" {
  description = "ID of the Key Vault reader managed identity, or null when the lookup is skipped."
  value       = local.kv_reader_identity_id
}

# =============================================================================
# Web App
# =============================================================================
output "web_app_id" {
  description = "ID of the Linux Web App"
  value       = azurerm_linux_web_app.appservice.id
}

output "web_app_name" {
  description = "Name of the Linux Web App"
  value       = azurerm_linux_web_app.appservice.name
}

output "web_app_default_hostname" {
  description = "Default hostname of the Linux Web App"
  value       = azurerm_linux_web_app.appservice.default_hostname
}

# Subscription info
output "subscription_id" {
  description = "Current subscription ID"
  value       = data.azurerm_subscription.current.subscription_id
}

output "tenant_id" {
  description = "Current tenant ID"
  value       = data.azurerm_client_config.current.tenant_id
}

# Tags (pass-through for consistency)
output "tags" {
  description = "Tags from subscription"
  value       = var.tags
}

# Formatted app name for use in other resources
output "formatted_app_name" {
  description = "Formatted application name"
  value       = local.formatted_app_name
}

# Environment and naming
output "env" {
  description = "Environment"
  value       = var.env
}

output "location" {
  description = "Location"
  value       = var.location
}

output "pid" {
  description = "Project identifier"
  value       = var.pid
}
