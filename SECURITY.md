# Security Policy

## Reporting a vulnerability

Please **do not** open a public issue. Report it privately through
[GitHub private vulnerability reporting](https://github.com/lesis-lat/trainings/security/advisories/new)
or by email to trainings@lesis.lat. Include the affected URL or file, the steps to
reproduce, and the impact. We aim to acknowledge reports within 5 business days.

## Scope

This repository builds a static Jekyll site (trainings.lesis.lat) served by GitHub
Pages behind Cloudflare. In scope: the site's content and markup, the GitHub
Actions workflows, and the build dependencies. Third-party services (GitHub,
Cloudflare, Google Analytics, cdnjs) are out of scope.

## Hardening in place

- **Content-Security-Policy** shipped as a `<meta>` tag in `_includes/head.html`:
  no inline scripts or event handlers, scripts only from this origin and Google
  Tag Manager, no forms, no plugins, no `<base>` rewriting.
- **Subresource Integrity** on the one third-party stylesheet (Font Awesome on cdnjs).
- **CI supply chain**: every action is pinned to a full commit SHA, Docker images
  to a digest; `GITHUB_TOKEN` is read-only by default with write scopes granted
  per job; `actions/checkout` never persists credentials; npm lifecycle scripts
  are disabled; Dependabot waits 7 days before proposing a new version; zizmor
  and actionlint audit the workflows on every PR; CodeQL, TruffleHog and a weekly
  OWASP ZAP baseline run continuously.

## Response headers (Cloudflare)

GitHub Pages cannot set custom headers, and some protections are ignored when
delivered via `<meta>`. Configure them as a Cloudflare **Transform Rule → Modify
Response Header** on `trainings.lesis.lat`:

| Header | Value |
| --- | --- |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Content-Security-Policy` | `frame-ancestors 'none'` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()` |
| `Cross-Origin-Opener-Policy` | `same-origin` |

Also enable in Cloudflare: *SSL/TLS → Full (strict)*, *Always Use HTTPS*,
*Minimum TLS Version 1.2*, and *HSTS*. In the repository settings: enforce HTTPS
on Pages, protect `main` (required reviews and status checks), enable secret
scanning push protection and private vulnerability reporting.
