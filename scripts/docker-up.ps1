$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
  Write-Host "❌ Docker is not installed or not on PATH."
  Write-Host "Install Docker Desktop, then restart your terminal."
  exit 1
}

try {
  docker compose version | Out-Null
} catch {
  Write-Host "❌ Docker Compose plugin is unavailable."
  Write-Host "Update Docker Desktop and ensure Compose v2 is enabled."
  exit 1
}

if (-not (Test-Path "docker-compose.yml")) {
  Write-Host "❌ docker-compose.yml not found in: $root"
  Write-Host "Run from a checkout that includes docker-compose.yml."
  exit 1
}

Write-Host "✅ Starting Efortlex with Docker Compose from: $root"
docker compose up --build @args
