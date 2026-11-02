# =============================================================================
# Local Variables (Node.js/React SPA)
# =============================================================================
locals {
  env      = "dev"
  location = "westeurope"
  pid      = "dso"

  # Node.js runtime stack for Express backend + Angular SPA
  application_stack = {
    node_version = "20-lts"
  }

  # Ignore unresolved pipeline placeholders like $(GEN_AI_API_KEY) passed as -var.
  gen_ai_api_key_is_placeholder = (
    var.gen_ai_api_key != null && var.gen_ai_api_key != "" &&
    can(regex("^\\$\\([A-Za-z0-9_.]+\\)$", var.gen_ai_api_key))
  )
  effective_gen_ai_api_key = local.gen_ai_api_key_is_placeholder ? null : var.gen_ai_api_key

  # Migration + no literal key: omit GEN_AI entirely (no app setting, no Key Vault ref).
  omit_gen_ai_app_setting = var.enable_hackspace_migration && (local.effective_gen_ai_api_key == null || local.effective_gen_ai_api_key == "")

  gen_ai_app_setting_fragment = (
    local.effective_gen_ai_api_key != null && local.effective_gen_ai_api_key != "" ? { "GEN_AI_API_KEY" = local.effective_gen_ai_api_key } : (
      local.omit_gen_ai_app_setting ? {} : {
        "GEN_AI_API_KEY" = "@Microsoft.KeyVault(VaultName=gphackspaces;SecretName=genaihub-qa-subscription-key)"
      }
    )
  )

  skip_kv_reader_identity = (
    (local.effective_gen_ai_api_key != null && local.effective_gen_ai_api_key != "")
    || local.omit_gen_ai_app_setting
  )
  effective_managed_identity_name = local.skip_kv_reader_identity ? null : var.managed_identity_name

  effective_shared_app_service_plan_id = var.enable_hackspace_migration ? null : var.shared_app_service_plan_id

  hackspace_tags = merge(
    data.azurerm_subscription.current.tags,
    var.enable_hackspace_migration ? { "hackspace-deployment-mode" = "hackspace-migration" } : {}
  )

  # Node.js Express + Angular SPA app settings
  app_settings = merge({
    "APPINSIGHTS_INSTRUMENTATIONKEY"            = module.hackspace_base.app_insights_instrumentation_key
    "APPLICATIONINSIGHTS_CONNECTION_STRING"     = module.hackspace_base.app_insights_connection_string
    "WEBSITE_AZMON_PREVIEW_ENABLED"             = "true"
    "WEBSITE_WEBDEPLOY_USE_SCM"                 = "false"
    "WEBSITE_NODE_DEFAULT_VERSION"              = "20-lts"
    "MICROSOFT_PROVIDER_AUTHENTICATION_SECRET"  = var.microsoft_provider_auth_secret
    "WEBSITE_AUTH_AAD_ALLOWED_TENANTS"          = var.auth_tenant_id
    "AZURE_SERVER_URL"                          = format("https://as%s%s.azurewebsites.net", local.env, var.app_name)
    "GEN_AI_ENDPOINT"                           = "https://kumarirstfoundryproject.services.ai.azure.com/openai/v1/responses"
    "GEN_AI_MODEL"                              = "gpt-4o"
    "GEN_AI_API_KEY_HEADER"                     = "api-key"
    "GEN_AI_API_KEY_PREFIX"                     = ""
    "GEN_AI_TIMEOUT_MS"                         = "30000"
  }, local.gen_ai_app_setting_fragment)

  # SPA-appropriate sticky settings (no Java-specific diagnostics)
  sticky_settings = [
    "MICROSOFT_PROVIDER_AUTHENTICATION_SECRET",
    "APPINSIGHTS_INSTRUMENTATIONKEY",
    "APPLICATIONINSIGHTS_CONNECTION_STRING",
    "WEBSITE_NODE_DEFAULT_VERSION",
  ]
}

# =============================================================================
# Hackspace Base Module - provides RG, App Plan, Log Analytics, App Insights, Web App
# =============================================================================
module "hackspace_base" {
  source = "./modules/hackspace-base"

  app_name         = var.app_name
  env              = local.env
  location         = local.location
  pid              = local.pid
  tags             = local.hackspace_tags
  application_type = "web"

  # Node.js/React SPA configuration
  app_settings      = local.app_settings
  application_stack = local.application_stack
  sticky_settings   = local.sticky_settings

  shared_app_service_plan_id = local.effective_shared_app_service_plan_id

  connected_vnet_name    = var.connected_vnet_name
  connected_vnet_rg_name = var.connected_vnet_rg_name
  appservice_subnet_name = var.appservice_subnet_name

  managed_identity_name = local.effective_managed_identity_name
  managed_identity_rg   = var.managed_identity_rg

  auth_client_id = var.auth_client_id
  auth_tenant_id = var.auth_tenant_id
}

# =============================================================================
# Data Sources
# =============================================================================
data "azurerm_subscription" "current" {}

data "azurerm_client_config" "current" {}

# =============================================================================
# VIP — Angular 19 frontend + Express REST backend
#
# Express backend serves both the REST API (/api/*) and the Angular SPA.
# Angular dist output is copied into backend/public at build time.
# =============================================================================
