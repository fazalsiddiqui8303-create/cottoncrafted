import type { MetadataRoute } from 'next';
import { db } from '../lib/db';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const ps = await db.product.findMany({ where: { visibility: 'PUBLISHED' }, select: { slug: true, updatedAt: true } }).catch(() => []);
  return [
    { url: base },
    { url: `${base}/shop` },
    { url: `${base}/collections` },
    { url: `${base}/offers` },
    ...ps.map(p => ({ url: `${base}/product/${p.slug}`, lastModified: p.updatedAt }))
  ];
}
