import {NextResponse} from 'next/server'; import {requireAdmin} from '../../../lib/auth';
export async function POST(){try{await requireAdmin();return NextResponse.json({error:'For deployment-safe storage, connect Supabase/S3 and issue signed upload URLs here.'},{status:501})}catch{return NextResponse.json({error:'Unauthorized'},{status:401})}}
