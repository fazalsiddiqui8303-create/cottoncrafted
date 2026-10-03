import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

function getSecret() {
  const value = process.env.AUTH_SECRET;
  if (value) return new TextEncoder().encode(value);
  if (process.env.NODE_ENV === 'production') {
    throw new Error('AUTH_SECRET is not configured. Add it to the deployment environment.');
  }
  return new TextEncoder().encode('dev-only-change-me');
}

export async function createSession(userId: string) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());

  (await cookies()).set('cc_session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function getSession() {
  const token = (await cookies()).get('cc_session')?.value;
  if (!token) return null;
  try {
    return (await jwtVerify(token, getSecret())).payload as { userId: string };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const s = await getSession();
  if (!s) throw new Error('UNAUTHORIZED');
  return s;
}

export async function logout() {
  (await cookies()).delete('cc_session');
}
