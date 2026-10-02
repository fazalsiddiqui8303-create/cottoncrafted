# CottonCrafted — D2C Performance Marketing Portfolio App

A production-style Next.js + PostgreSQL + Prisma starter implementing the requested CottonCrafted storefront and no-code CMS architecture.

## Stack
- Next.js App Router
- React
- PostgreSQL + Prisma
- JWT session cookie + bcrypt admin authentication
- Responsive CSS (mobile/tablet/desktop)
- Database-backed products, categories, collections, pages, offers, testimonials, leads, navigation, settings, custom code and events
- Exact supplied logo at `public/logo.png`

## Run locally
1. Install Node 20+.
2. Copy `.env.example` to `.env` and set `DATABASE_URL` and a strong `AUTH_SECRET`.
3. Run `npm install`.
4. Run `npm run db:push`.
5. Run `npm run db:seed`.
6. Run `npm run dev`.
7. Open `/` for the storefront and `/admin` for CMS.

Seed admin: `admin@cottoncrafted.in` / `ChangeMe123!` — change it before production use.

## CMS
The admin includes CRUD for products, categories, collections, pages, offers, testimonials, leads, navigation, settings and tracking/custom code. Product/content changes are stored in PostgreSQL and are read by the public site.

## Page builder
Pages store ordered JSON section blocks. Supported public block types in the renderer: `hero`, `text`, `image`, `cta`. Example:
```json
[
  {"type":"hero","eyebrow":"Varanasi","title":"Wear your city.","text":"A city story in cotton."},
  {"type":"text","title":"The story","text":"Your copy here."},
  {"type":"image","src":"https://...","alt":"City detail"},
  {"type":"cta","title":"Explore the drop","label":"Shop","href":"/shop"}
]
```

## Tracking/custom code
`/admin/tracking` stores named code entries with HEAD, BODY_START, BODY_END and GLOBAL locations. Entries can be enabled/disabled without deleting them. Page-specific and product-specific scope IDs are supported by the data model and public rendering. Only add trusted scripts.

## WhatsApp + attribution
The default WhatsApp number is `+91 8303012147`. Product-specific messages are generated dynamically. Lead capture stores available UTM fields. The event endpoint supports PageView/ViewContent/Search/WhatsAppClick/Lead/Contact and other custom event names.

## Production storage note
The requested database-backed CMS is PostgreSQL-ready. Image URLs are intentionally used by the MVP seed/admin UI; the `/api/upload` endpoint is a clear integration point for Supabase Storage or S3 signed uploads so media survives deployment and CDN delivery.
