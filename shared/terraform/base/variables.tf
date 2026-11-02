variable "app_name" {
  description = "The name of the application"
  type        = string
}

variable "db_username" {
  description = "The username for the database"
  type        = string
  default = "pgadmin"
}

variable "microsoft_provider_auth_secret" {
  description = "App Registration client secret for App Service Entra ID auth (MICROSOFT_PROVIDER_AUTHENTICATION_SECRET)."
  type        = string
  sensitive   = true
}

variable "auth_client_id" {
  description = "Entra ID app registration client ID for App Service Easy Auth. Sandbox default; migration uses deployment SP client ID from the Azure RM service connection."
  type        = string
  default     = "ed1f6f9c-ee39-4583-bc32-e2444e44e1fd"
}

variable "auth_tenant_id" {
  description = "Entra ID tenant ID (WEBSITE_AUTH_AAD_ALLOWED_TENANTS and auth endpoint). Same for sandbox and migration."
  type        = string
  default     = "f25493ae-1c98-41d7-8a33-0be75f5fe603"
}

variable "enable_hackspace_migration" {
  description = "Two-mode switch: true = dedicated App Service Plan only (shared plan id ignored). false = shared plan only (shared_app_service_plan_id must be set)."
  type        = bool
  default     = false
}

variable "shared_app_service_plan_id" {
  description = "Full Azure resource ID of the shared App Service Plan. Required when enable_hackspace_migration is false. Ignored when enable_hackspace_migration is true (a dedicated plan is always used)."
  type        = string
  default     = null

  validation {
    condition = var.enable_hackspace_migration ? true : (
      var.shared_app_service_plan_id != null && can(regex("^/subscriptions/", var.shared_app_service_plan_id))
    )
    error_message = "When enable_hackspace_migration is false, set shared_app_service_plan_id to the full resource ID (e.g. SHARED_APP_SERVICE_PLAN_ID in Azure DevOps)."
  }
}

variable "connected_vnet_name" {
  description = "VNet for App Service VNet integration (passed to hackspace-base). Override via CI for hackspace migration when using a different landing zone."
  type        = string
  default     = "euw-hub14-142964D0d-LAZ01-vnet"
}

variable "connected_vnet_rg_name" {
  description = "Resource group of connected_vnet_name."
  type        = string
  default     = "CEPReserved-Connected01-rg"
}

variable "appservice_subnet_name" {
  description = "Subnet delegated for App Service in the connected VNet."
  type        = string
  default     = "sandbox-TZ-sub"
}

variable "postgres_subnet_name" {
  description = "Existing subnet delegated for PostgreSQL Flexible Server in the connected VNet."
  type        = string
  default     = "psqlflexible-TZ-sub"
}

# Optional: literal GenAI API key from CI. With enable_hackspace_migration off and this unset,
# the app uses the gphackspaces Key Vault reference (KV reader UAMI). With migration on and unset, GenAI is omitted.
variable "gen_ai_api_key" {
  description = "Optional literal GenAI API key from CI. When enable_hackspace_migration is true and this is unset, the GEN_AI_API_KEY app setting is omitted (no GenAI integration). When migration is off and this is unset, the gphackspaces Key Vault reference is used (with KV reader UAMI)."
  type        = string
  default     = null
  sensitive   = true
}

variable "managed_identity_name" {
  description = "User-assigned managed identity used for Key Vault references. Set to null or empty string to skip and disable Key Vault-backed app settings."
  type        = string
  nullable    = true
  default     = "gphackspaces-kv-reader"
}

variable "managed_identity_rg" {
  description = "Resource group of managed_identity_name. Ignored when the identity is skipped."
  type        = string
  default     = "rg-shared-resources"
}
