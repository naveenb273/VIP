terraform {
  required_version = "~> 1.3"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>4.58.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~>3.4"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~>2.33.0"
    }
    azapi = {
      source  = "azure/azapi"
      version = "~>2.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = "445b0818-90bc-4af0-911a-c61f511c7693"
}
