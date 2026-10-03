export const dynamic = 'force-dynamic';
import {db} from '../../../lib/db'; import ResourceManager from '../../../components/ResourceManager'; export default async function Page(){const items=await db.page.findMany();return <ResourceManager kind="pages" initial={JSON.parse(JSON.stringify(items))}/>}
