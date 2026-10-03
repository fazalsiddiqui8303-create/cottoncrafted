import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is required to seed the database.');

const adapter = new PrismaPg({ connectionString });
const db = new PrismaClient({ adapter });

async function main() {
  const hash = await bcrypt.hash('ChangeMe123!', 12);
  await db.adminUser.upsert({ where: { email: 'admin@cottoncrafted.in' }, update: {}, create: { email: 'admin@cottoncrafted.in', passwordHash: hash } });

  const cats = [['T-Shirts', 't-shirts'], ['Oversized', 'oversized'], ['Embroidered', 'embroidered'], ['Printed', 'printed']];
  for (const [name, slug] of cats) await db.category.upsert({ where: { slug }, update: {}, create: { name, slug } });

  const cols = [['Varanasi', 'varanasi'], ['Delhi', 'delhi'], ['Lucknow', 'lucknow'], ['New Arrivals', 'new-arrivals']];
  for (const [name, slug] of cols) await db.collection.upsert({ where: { slug }, update: {}, create: { name, slug } });

  const tshirt = await db.category.findUnique({ where: { slug: 't-shirts' } });
  const varanasi = await db.collection.findUnique({ where: { slug: 'varanasi' } });
  const delhi = await db.collection.findUnique({ where: { slug: 'delhi' } });
  const lucknow = await db.collection.findUnique({ where: { slug: 'lucknow' } });

  const products = [
    ['Varanasi Heritage Tee', 'varanasi-heritage-tee', 999, 'Premium cotton tee inspired by the timeless character of Varanasi.', varanasi?.id],
    ['Delhi Streets Tee', 'delhi-streets-tee', 1099, 'A clean city-inspired graphic with Delhi street energy.', delhi?.id],
    ['Lucknow Culture Tee', 'lucknow-culture-tee', 999, 'Modern apparel inspired by Lucknow craftsmanship and culture.', lucknow?.id],
    ['Banaras Ghat Oversized Tee', 'banaras-ghat-oversized-tee', 1299, 'Relaxed oversized silhouette with a Banaras ghat-inspired story.', varanasi?.id]
  ];

  for (const [name, slug, price, shortDescription, collectionId] of products) {
    await db.product.upsert({
      where: { slug: String(slug) },
      update: {},
      create: {
        name: String(name),
        slug: String(slug),
        price: Number(price),
        shortDescription: String(shortDescription),
        description: String(shortDescription),
        categoryId: tshirt?.id,
        collectionId: collectionId as string,
        images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80'],
        sizes: ['S', 'M', 'L', 'XL'],
        colours: ['Off White'],
        featured: true,
        visibility: 'PUBLISHED'
      }
    });
  }

  await db.offer.upsert({
    where: { id: 'seed-first15' },
    update: {},
    create: {
      id: 'seed-first15',
      name: 'First Order 15% OFF',
      discountType: 'PERCENT',
      discountAmount: 15,
      code: 'FIRST15',
      startDate: new Date(),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      bannerText: 'FIRST15 — 15% OFF your first order',
      cta: 'Shop the drop',
      active: true
    }
  });

  const nav = [['Home', '/'], ['Shop', '/shop'], ['Collections', '/collections'], ['About', '/about'], ['Contact', '/contact']];
  for (let i = 0; i < nav.length; i++) {
    await db.navigationItem.findFirst({ where: { label: nav[i][0], href: nav[i][1] } }) || await db.navigationItem.create({ data: { label: nav[i][0], href: nav[i][1], sortOrder: i } });
  }

  const settings = {
    whatsappNumber: '918303012147',
    email: 'hello@cottoncrafted.in',
    instagramUrl: 'https://instagram.com/cottoncrafted',
    brandTagline: 'Cities • Culture • Wearable Stories'
  };
  for (const [key, value] of Object.entries(settings)) {
    await db.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }

  console.log('Seeded. Admin: admin@cottoncrafted.in / ChangeMe123!');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(async () => {
  await db.$disconnect();
});
