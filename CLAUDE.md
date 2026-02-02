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

### E2E Tests (Playwright)

```bash
cd e2e
npm ci
npx playwright install --with-deps chromium

# Run tests (requires site running on localhost:8000)
npm test

# Run with browser visible
npm run test:headed

# Debug mode
npm run test:debug

# View HTML report
npm run report
```

Set `BASE_URL` env var to test against different hosts.

## Architecture

- **index.html**: Main site (Bootstrap 5.2.2 + FontAwesome)
- **css/custom.css**: Custom styling (Gurtz Group color scheme)
- **e2e/**: Playwright tests (TypeScript)
- **Dockerfile**: Apache httpd:2.4 serving static files

## CI/CD Pipeline

Push to `main` triggers `.github/workflows/ci-cd.yml`:
1. Runs Playwright tests
2. Auto-increments patch version from git tags
3. Builds and pushes to `ghcr.io/marshalcurrier/marshalcurrierresume`
4. Updates `k8s-manifests` repo with new image tag
5. Waits for ArgoCD to sync deployment

**Do not manually update k8s resources** - ArgoCD manages the `marshalcurrier` deployment in `apps` namespace.

## Required Secrets (GitHub)

- `K8S_MANIFESTS_DEPLOY_KEY`: SSH key for k8s-manifests repo
- `KUBECONFIG_BASE64`: Base64-encoded kubeconfig for ArgoCD sync verification
