export function whatsappUrl(message:string, number=process.env.NEXT_PUBLIC_WHATSAPP||'918303012147'){return `https://wa.me/${number}?text=${encodeURIComponent(message)}`}
export const generalWhatsAppMessage="Hi CottonCrafted, I came from your website and want to know more about your collection.";
export const productWhatsAppMessage=(name:string)=>`Hi CottonCrafted, I'm interested in the ${name}. Please share availability, sizes and ordering details.`;
