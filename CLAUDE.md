# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static HTML portfolio/resume site for Marshal Currier (business acquisition profile). No build step - static assets served by Apache HTTP Server.

**Live URL**: https://marshalcurrier.com (deployed via ArgoCD)

## Development Commands

### Local Development

```bash
# Serve locally with Python
python -m http.server 8000

# Or with Docker
docker build -t marshalcurrier-resume .
docker run -p 8000:80 marshalcurrier-resume
```

## Architecture

- **index.html**: Main site (Bootstrap 5.2.2 + FontAwesome)
- **css/custom.css**: Custom styling (Gurtz Group color scheme)
- **e2e/**: Playwright tests (TypeScript)
- **Dockerfile**: Apache httpd:2.4 serving static files

## CI/CD Pipeline

Push to `main` triggers `.github/workflows/ci-cd.yml`:
1. Auto-increments patch version from git tags
2. Builds and pushes to `ghcr.io/marshalcurrier/marshalcurrierresume`
3. Updates `k8s-manifests` repo with new image tag
4. Waits for ArgoCD to sync deployment

**Do not manually update k8s resources** - ArgoCD manages the `marshalcurrier` deployment in `apps` namespace.

## Required Secrets (GitHub)

- `K8S_MANIFESTS_DEPLOY_KEY`: SSH key for k8s-manifests repo
- `KUBECONFIG_BASE64`: Base64-encoded kubeconfig for ArgoCD sync verification
