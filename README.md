# CottonCrafted — D2C Website + CMS

Production-style full-stack CottonCrafted D2C website and admin CMS built with Next.js, Prisma, PostgreSQL and Cloudflare Workers.

## Stack

- Next.js 15 App Router
- React 19
- PostgreSQL + Prisma ORM 6
- Prisma driver adapter for PostgreSQL (`@prisma/adapter-pg`) with the Rust-free Prisma client
- OpenNext for Cloudflare Workers
- Wrangler
- JWT session auth with `jose`
- `bcryptjs` password hashing

## Cloudflare Workers deployment

This project is configured for the Cloudflare OpenNext path rather than Cloudflare's automatic Next.js/vinext conversion. Cloudflare's current docs recommend vinext for new projects, while OpenNext remains the documented path for maintaining an existing Next.js app. The repository therefore includes `wrangler.jsonc` and `open-next.config.ts` and builds to `.open-next/worker.js`.

In Cloudflare Workers Builds use:

- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx opennextjs-cloudflare deploy`
- Root directory: `/`
- Production branch: `main`

Required runtime/build variables:

- `DATABASE_URL` — PostgreSQL connection string
- `AUTH_SECRET` — long random secret used to sign the admin session cookie
- `NEXT_PUBLIC_SITE_URL` — public site URL
- `NEXT_PUBLIC_WHATSAPP` — WhatsApp number without `+` or spaces, for example `918303012147`

Never commit real secrets to GitHub. Cloudflare Workers Build variables/secrets are the appropriate place for production values.

## Database

Create the PostgreSQL database, set `DATABASE_URL`, then run:

```bash
npm install
npm run db:push
npm run db:seed
```

The seed creates demo content and a demo admin account. Change the seeded password before production use.

## Local development

```bash
npm install
npm run dev
```

For a production-style Cloudflare build/preview:

```bash
npm run build
npm run preview
```

## Notes

The exact CottonCrafted logo is stored at `public/logo.png` and used across the site. Product images are currently URL-based; the `/api/upload` route is intentionally an integration point for connecting Cloudflare R2, Supabase Storage, or S3 later.
