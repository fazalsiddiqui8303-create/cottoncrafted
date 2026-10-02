import './globals.css';
import { db } from '@/lib/db';
import { getActiveCodes } from '@/lib/site';
export const metadata={title:'CottonCrafted — Cities • Culture • Wearable Stories',description:'Premium cotton T-shirts inspired by Indian cities.'};
export default async function RootLayout({children}:{children:React.ReactNode}){
 const nav=await db.navigationItem.findMany({where:{published:true},orderBy:{sortOrder:'asc'}}).catch(()=>[]);
 const codes=await getActiveCodes().catch(()=>[]);
 return <html lang="en"><body>
  {codes.filter(c=>c.location==='HEAD'||c.location==='GLOBAL').map(c=><script key={c.id} dangerouslySetInnerHTML={{__html:c.code}}/>)}
  <header className="header"><div className="container header-inner"><a href="/"><img className="logo" src="/logo.png" alt="CottonCrafted"/></a><nav className="nav">{nav.length?nav.map(n=><a key={n.id} href={n.href}>{n.label}</a>):<><a href="/">Home</a><a href="/shop">Shop</a><a href="/collections">Collections</a><a href="/about">About</a><a href="/contact">Contact</a></>}</nav><button className="menu" aria-label="Menu">☰</button></div></header>
  {codes.filter(c=>c.location==='BODY_START').map(c=><script key={c.id} dangerouslySetInnerHTML={{__html:c.code}}/>)}
  {children}
  <footer className="footer"><div className="container footer-grid"><div><img src="/logo.png" alt="CottonCrafted" className="logo"/><p className="muted">Cities • Culture • Wearable Stories</p></div><div><b>Explore</b><p><a href="/shop">Shop</a></p><p><a href="/collections">Collections</a></p><p><a href="/offers">Offers</a></p></div><div><b>Help</b><p><a href="/contact">Contact</a></p><p><a href="/privacy">Privacy</a></p><p><a href="/terms">Terms</a></p></div></div></footer>
  {codes.filter(c=>c.location==='BODY_END').map(c=><script key={c.id} dangerouslySetInnerHTML={{__html:c.code}}/>)}
 </body></html>
}
