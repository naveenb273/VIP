locals {
  formatted_app_name = replace(replace(replace(lower(var.app_name), "_", "-"), ".", "-"), "/ +/", "-")

  # Naming conventions
  resource_group_name    = format("rgwe%s%s-%s", var.pid, var.env, local.formatted_app_name)
  app_service_plan_name  = format("apwe%s%s-%s", var.pid, var.env, local.formatted_app_name)
  app_insights_name      = format("aiwe%s%s-%s", var.pid, var.env, local.formatted_app_name)
  log_analytics_name     = format("lawe%s%s-%s", var.pid, var.env, local.formatted_app_name)

  # Use shared plan if provided, otherwise use the one created by this module
  service_plan_id = var.shared_app_service_plan_id != null ? var.shared_app_service_plan_id : module.app_plan[0].id

  use_kv_reader_identity = var.managed_identity_name != null && var.managed_identity_name != ""
  kv_reader_identity_id  = local.use_kv_reader_identity ? data.azurerm_user_assigned_identity.kv_reader[0].id : null

  # App Service Plan Configuration (only used when shared plan is not provided)
  app_service_plan_config = {
    custom_name = true
    name        = local.app_service_plan_name
    location    = var.location
    os_type     = "Linux"
    sku_name    = var.app_service_plan_sku
    pid         = var.pid
  }
}

# Data sources
data "azurerm_client_config" "current" {}

data "azurerm_subscription" "current" {}

data "azurerm_virtual_network" "connected_vnet" {
  name                = var.connected_vnet_name
  resource_group_name = var.connected_vnet_rg_name
}

data "azurerm_subnet" "appservice_subnet" {
  name                 = var.appservice_subnet_name
  virtual_network_name = var.connected_vnet_name
  resource_group_name  = var.connected_vnet_rg_name
}

data "azurerm_user_assigned_identity" "kv_reader" {
  count               = local.use_kv_reader_identity ? 1 : 0
  name                = var.managed_identity_name
  resource_group_name = var.managed_identity_rg
}

# Resource Group
resource "azurerm_resource_group" "rg" {
  name     = local.resource_group_name
  location = var.location
  tags     = var.tags
}

# App Service Plan (only created when shared_app_service_plan_id is not provided)
module "app_plan" {
  count                           = var.shared_app_service_plan_id == null ? 1 : 0
  source                          = "app.terraform.io/VolvoGroup-Internal/appservice-plan-93813/azurerm"
  version                         = "2.0.1"
  env                             = var.env
  resource_group_name             = azurerm_resource_group.rg.name
  app_service_plan_config         = local.app_service_plan_config
  per_site_scaling_enabled        = false
  zone_balancing_enabled          = false
  worker_count                    = null
  maximum_elastic_worker_count    = null
  app_service_environment_id      = null
  premium_plan_auto_scale_enabled = false
  tags                            = var.tags

  depends_on = [azurerm_resource_group.rg]
}

# Log Analytics Workspace
module "log_analytics" {
  source                                  = "app.terraform.io/VolvoGroup-Internal/log-analytics-workspace-93813/azurerm"
  version                                 = "1.0.2"
  name                                    = local.log_analytics_name
  location                                = var.location
  resource_group_name                     = azurerm_resource_group.rg.name
  sku                                     = "PerGB2018"
  retention_in_days                       = 30
  daily_quota_gb                          = 1
  internet_ingestion_enabled              = true
  internet_query_enabled                  = true
  allow_resource_only_permissions         = true
  local_authentication_enabled            = false
  reservation_capacity_in_gb_per_day      = null
  cmk_for_query_forced                    = null
  immediate_data_purge_on_30_days_enabled = null
  data_collection_rule_id                 = null
  identity                                = null
  tags                                    = var.tags

  depends_on = [azurerm_resource_group.rg]
}

# Application Insights
module "app_insights" {
  source                                = "app.terraform.io/VolvoGroup-Internal/app-insights-93813/azurerm"
  name                                  = local.app_insights_name
  location                              = var.location
  resource_group_name                   = azurerm_resource_group.rg.name
  application_type                      = var.application_type
  workspace_id                          = module.log_analytics.id
  retention_in_days                     = "30"
  sampling_percentage                   = "50"
  daily_data_cap_in_gb                  = "1"
  daily_data_cap_notifications_disabled = true
  disable_ip_masking                    = true
  local_authentication_disabled         = false
  internet_ingestion_enabled            = true
  internet_query_enabled                = true
  force_customer_storage_for_profiler   = false
  tags                                  = var.tags

  depends_on = [azurerm_resource_group.rg]
}

# =============================================================================
# Web App
# =============================================================================
resource "azurerm_linux_web_app" "appservice" {
  name                      = format("as%s%s", var.env, local.formatted_app_name)
  resource_group_name       = azurerm_resource_group.rg.name
  location                  = var.location
  service_plan_id           = local.service_plan_id
  https_only                = true
  tags                      = var.tags
  app_settings              = var.app_settings
  virtual_network_subnet_id = data.azurerm_subnet.appservice_subnet.id

  logs {
    detailed_error_messages = true
    failed_request_tracing  = true
    application_logs {
      file_system_level = "Verbose"
    }
    http_logs {
      file_system {
        retention_in_days = 7
        retention_in_mb   = 35
      }
    }
  }

  identity {
    type         = local.use_kv_reader_identity ? "SystemAssigned, UserAssigned" : "SystemAssigned"
    identity_ids = local.use_kv_reader_identity ? [local.kv_reader_identity_id] : null
  }

  site_config {
    worker_count                      = 1
    health_check_eviction_time_in_min = 10
    health_check_path                 = "/"
    vnet_route_all_enabled            = true

    application_stack {
      dotnet_version      = lookup(var.application_stack, "dotnet_version", null)
      java_server         = lookup(var.application_stack, "java_server", null)
      java_server_version = lookup(var.application_stack, "java_server_version", null)
      java_version        = lookup(var.application_stack, "java_version", null)
      node_version        = lookup(var.application_stack, "node_version", null)
      python_version      = lookup(var.application_stack, "python_version", null)
    }
  }

  dynamic "connection_string" {
    for_each = var.connection_strings
    content {
      name  = connection_string.value.name
      type  = connection_string.value.type
      value = connection_string.value.value
    }
  }

  auth_settings_v2 {
    auth_enabled             = true
    default_provider         = "azureactivedirectory"
    excluded_paths           = []
    forward_proxy_convention = "NoProxy"
    http_route_api_prefix    = "/.auth"
    require_authentication   = true
    require_https            = true
    runtime_version          = "~1"
    unauthenticated_action   = "RedirectToLoginPage"

    active_directory_v2 {
      allowed_applications        = [var.auth_client_id]
      client_id                   = var.auth_client_id
      client_secret_setting_name  = "MICROSOFT_PROVIDER_AUTHENTICATION_SECRET"
      tenant_auth_endpoint        = "https://sts.windows.net/${var.auth_tenant_id}/v2.0"
      www_authentication_disabled = false
    }

    login {
      cookie_expiration_convention      = "FixedTime"
      cookie_expiration_time            = "08:00:00"
      logout_endpoint                   = "/.auth/logout"
      nonce_expiration_time             = "00:05:00"
      preserve_url_fragments_for_logins = false
      token_refresh_extension_time      = 72
      token_store_enabled               = true
      validate_nonce                    = true
    }
  }

  sticky_settings {
    app_setting_names = var.sticky_settings
  }

  lifecycle {
    ignore_changes = [site_config[0].app_command_line]
  }

  depends_on = [module.app_plan]
}

# TLS Configuration
resource "azapi_update_resource" "tls" {
  resource_id = azurerm_linux_web_app.appservice.id
  type        = "Microsoft.Web/sites@2022-03-01"
  body = {
    properties = merge(
      {
        "minTlsCipherSuite" = "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
      },
      local.use_kv_reader_identity ? {
        "keyVaultReferenceIdentity" = local.kv_reader_identity_id
      } : {}
    )
  }
}

# Diagnostic Settings for Web App
data "azurerm_monitor_diagnostic_categories" "appsvc" {
  resource_id = azurerm_linux_web_app.appservice.id
}

resource "azurerm_monitor_diagnostic_setting" "app" {
  name                       = format("dswe%s%s-%s", var.pid, var.env, local.formatted_app_name)
  target_resource_id         = azurerm_linux_web_app.appservice.id
  log_analytics_workspace_id = module.log_analytics.id

  dynamic "enabled_log" {
    for_each = data.azurerm_monitor_diagnostic_categories.appsvc.log_category_types
    content {
      category = enabled_log.value
    }
  }

  dynamic "metric" {
    for_each = data.azurerm_monitor_diagnostic_categories.appsvc.metrics
    content {
      category = metric.value
    }
  }

  lifecycle {
    ignore_changes = [metric]
  }
}
