# Script for preparing terraform files in monorepo dev testing mode
# Copies shared terraform base files to the working directory

param(
    [Parameter(Mandatory=$true)]
    [string]$SourcesDirectory,
    
    [Parameter(Mandatory=$true)]
    [string]$WorkingDirectory
)

$sharedTfBase = Join-Path $SourcesDirectory "shared/terraform/base"

Write-Host "Copying shared terraform files for monorepo testing..."
Write-Host "Source: $sharedTfBase"
Write-Host "Destination: $WorkingDirectory"

if (Test-Path $sharedTfBase) {
    Copy-Item -Path "$sharedTfBase/modules" -Destination $WorkingDirectory -Recurse -Force
    Copy-Item -Path "$sharedTfBase/*.tf" -Destination $WorkingDirectory -Force
    Copy-Item -Path "$sharedTfBase/tfcloud.tpl" -Destination $WorkingDirectory -Force
    Write-Host "Shared terraform files copied successfully"
} else {
    Write-Error "Shared terraform base not found at: $sharedTfBase"
    exit 1
}
