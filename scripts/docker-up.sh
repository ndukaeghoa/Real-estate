#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if ! command -v docker >/dev/null 2>&1; then
  echo "❌ Docker is not installed or not on PATH."
  echo "Install Docker Desktop, then reopen your terminal."
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "❌ Docker Compose plugin is unavailable."
  echo "Update Docker Desktop and enable Compose v2."
  exit 1
fi

if [[ ! -f docker-compose.yml ]]; then
  echo "❌ docker-compose.yml not found in: $ROOT_DIR"
  echo "Run this script from the project checkout that includes docker-compose.yml."
  exit 1
fi

echo "✅ Starting Efortlex with Docker Compose from: $ROOT_DIR"
docker compose up --build "$@"
