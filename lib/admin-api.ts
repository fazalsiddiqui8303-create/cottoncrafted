import {requireAdmin} from './auth'; import {body,err,ok} from './api';
export async function guard(){try{await requireAdmin();return null}catch{return err('Unauthorized',401)}}
export function clean(s:string){return s.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}
