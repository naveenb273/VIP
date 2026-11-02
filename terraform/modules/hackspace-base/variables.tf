variable "app_name" {
  description = "Application name used for resource naming"
  type        = string
}

variable "env" {
  description = "Environment (dev, prod)"
  type        = string
  default     = "dev"
}

variable "location" {
  description = "Azure region"
  type        = string
  default     = "westeurope"
}

variable "pid" {
  description = "Project identifier for naming"
  type        = string
  default     = "dso"
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}

variable "app_service_plan_sku" {
  description = "SKU for App Service Plan. Only used when shared_app_service_plan_id is not set."
  type        = string
  default     = "B1"
}

variable "shared_app_service_plan_id" {
  description = "ID of a pre-existing shared App Service Plan. When set, no new plan is created and this ID is used instead."
  type        = string
  default     = null
}

variable "application_type" {
  description = "Application Insights type (java, web, etc.)"
  type        = string
  default     = "web"
}

variable "connected_vnet_name" {
  description = "Name of the connected VNet"
  type        = string
  default     = "euw-hub14-142964D0d-LAZ01-vnet"
}

variable "connected_vnet_rg_name" {
  description = "Resource group of the connected VNet"
  type        = string
  default     = "CEPReserved-Connected01-rg"
}

variable "appservice_subnet_name" {
  description = "Subnet name for App Service"
  type        = string
  default     = "sandbox-TZ-sub"
}

variable "managed_identity_name" {
  description = "Name of the user-assigned managed identity for Key Vault access. Set to null or empty string to skip the lookup and disable Key Vault-backed app settings."
  type        = string
  nullable    = true
  default     = "gphackspaces-kv-reader"
}

variable "managed_identity_rg" {
  description = "Resource group of managed_identity_name. Ignored when the identity is skipped."
  type        = string
  default     = "rg-shared-resources"
}

# =============================================================================
# Web App Variables (passed from main.tf locals)
# =============================================================================
variable "app_settings" {
  description = "App settings for the Web App (platform-specific settings from locals)"
  type        = map(string)
  default     = {}
}

variable "application_stack" {
  description = "Application stack config - for Java: {java_server, java_server_version, java_version}, for .NET: {dotnet_version}"
  type        = map(string)
  default     = {}
}

variable "connection_strings" {
  description = "Connection strings for the Web App (e.g., SQL connection for .NET)"
  type = list(object({
    name  = string
    type  = string
    value = string
  }))
  default = []
}

variable "sticky_settings" {
  description = "App setting names that should be sticky (slot settings)"
  type        = list(string)
  default     = []
}

variable "auth_client_id" {
  description = "Entra ID app registration client ID for App Service Easy Auth"
  type        = string
}

variable "auth_tenant_id" {
  description = "Entra ID tenant ID for App Service Easy Auth"
  type        = string
}
