import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

declare global {
  var prisma: PrismaClient | undefined;
}

function createClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not configured. Add it to the deployment environment.');
  }

  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

function getClient() {
  if (!global.prisma) {
    global.prisma = createClient();
  }
  return global.prisma;
}

export const db = new Proxy({} as PrismaClient, {
  get(_target, property, receiver) {
    const client = getClient() as any;
    const value = Reflect.get(client, property, receiver);
    return typeof value === 'function' ? value.bind(client) : value;
  }
});
