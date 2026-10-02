import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-only-change-me');
export async function createSession(userId:string){ const token=await new SignJWT({userId}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('7d').sign(secret); (await cookies()).set('cc_session',token,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:60*60*24*7}); }
export async function getSession(){ const token=(await cookies()).get('cc_session')?.value; if(!token) return null; try{return (await jwtVerify(token,secret)).payload as {userId:string}}catch{return null} }
export async function requireAdmin(){ const s=await getSession(); if(!s) throw new Error('UNAUTHORIZED'); return s; }
export async function logout(){ (await cookies()).delete('cc_session'); }
