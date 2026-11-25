import { StudioHome } from "@/components/studio/StudioHome";
import { FAQ } from "@/lib/faq";
import { PRODUCTS, STUDIO } from "@/lib/products";
import { jsonLdString } from "@/lib/seo";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${STUDIO.url}/#organization`,
      name: STUDIO.name,
      alternateName: ["Depup", "depupstudio"],
      url: STUDIO.url,
      logo: `${STUDIO.url}/apple-icon.png`,
      email: STUDIO.email,
      description: `Independent, founder-led software studio in ${STUDIO.city}. Makers of depup.cloud, depup Office and Sentinel-ID.`,
      address: { "@type": "PostalAddress", addressLocality: STUDIO.city.split(",")[0], addressCountry: "ID" },
      areaServed: ["ID", "Worldwide"],
      knowsLanguage: ["en", "id"],
      owns: Object.values(PRODUCTS).map((p) => ({ "@id": `${STUDIO.url}${p.path}#app` })),
    },
    {
      "@type": "WebSite",
      "@id": `${STUDIO.url}/#website`,
      url: STUDIO.url,
      name: STUDIO.name,
      inLanguage: "en",
      publisher: { "@id": `${STUDIO.url}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${STUDIO.url}/#faq`,
      mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }} />
      <StudioHome />
    </>
  );
}
