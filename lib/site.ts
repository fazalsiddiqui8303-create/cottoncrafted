import { db } from './db';
export async function getSetting<T=unknown>(key:string, fallback:T):Promise<T>{const s=await db.siteSetting.findUnique({where:{key}}); return (s?.value as T) ?? fallback}
export async function getActiveCodes(location?:'HEAD'|'BODY_START'|'BODY_END'|'GLOBAL', scope?:{pageId?:string;productId?:string}){return db.customCode.findMany({where:{enabled:true,...(location?{location}:{}),...(scope?.pageId?{pageId:scope.pageId}:{}),...(scope?.productId?{productId:scope.productId}:{}),}})}
export function toArray(v:any):string[]{return Array.isArray(v)?v:[]}
