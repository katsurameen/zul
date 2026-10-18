# Zulfa Sulthany — Portfolio

Personal portfolio site for Zulfa Sulthany, a backend developer based in Bandung.
Built with Next.js (App Router, JavaScript), Tailwind CSS v4, and Framer Motion,
with a contact form that sends via Brevo and is protected by Google reCAPTCHA.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

Open http://localhost:3000.

## Environment variables

Create `.env.local` (never commit it) with:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical origin, e.g. `https://zulfasulthany.com`. Used for canonical/OG/sitemap URLs. |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Yes | reCAPTCHA v2 site key (public). |
| `RECAPTCHA_SECRET_KEY` | Yes | reCAPTCHA v2 secret key (server only). |
| `BREVO_API_KEY` | Yes | Brevo API key for sending mail. |
| `BREVO_SENDER_EMAIL` | Yes | Verified sender address in Brevo. |
| `BREVO_SENDER_NAME` | No | Display name for the sender. |
| `BREVO_RECIPIENT` | Yes | Where contact messages are delivered. |
| `SMTPXPRESS_RECIPIENT` | No | Fallback recipient if `BREVO_RECIPIENT` is unset. |

Without `NEXT_PUBLIC_SITE_URL`, the site falls back to a placeholder origin, so
set it before deploying.

## Scripts

- `npm run dev` — dev server (Turbopack: `npm run dev:turbo`).
- `npm run build` — production build.
- `npm run start` — serve the production build.
- `npm run lint` — ESLint.

## Project layout

```
src/
  app/
    layout.js              root layout: fonts, global metadata, JSON-LD
    page.js                home page, section composition
    globals.css            Tailwind v4 entry + brutalist design tokens
    opengraph-image.js     generated 1200x630 social share image
    robots.js, sitemap.js, manifest.js   SEO / PWA metadata routes
    api/send-email/route.js  contact form handler (reCAPTCHA + Brevo)
    components/            Header, sections, mobile menu, section dots
  hooks/useActiveSection.js  scroll-spy via IntersectionObserver
  lib/site.js              site metadata + Person JSON-LD
public/
  Files/                   downloadable CV
  Images/                  project + profile images
```

## Notes

- The hero photo at `public/Images/zul.jpg` is 300x250 and is rendered larger
  than its native size, so it looks soft. Replace it with a higher-resolution
  portrait (roughly 1200px wide) for a sharp result.
