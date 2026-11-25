import { StudioHome } from "@/components/studio/StudioHome";
import { PRODUCTS, STUDIO } from "@/lib/products";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${STUDIO.url}/#organization`,
      name: STUDIO.name,
      url: STUDIO.url,
      logo: `${STUDIO.url}/apple-icon.png`,
      email: STUDIO.email,
      address: { "@type": "PostalAddress", addressLocality: STUDIO.city.split(",")[0], addressCountry: "ID" },
    },
    {
      "@type": "WebSite",
      "@id": `${STUDIO.url}/#website`,
      url: STUDIO.url,
      name: STUDIO.name,
      publisher: { "@id": `${STUDIO.url}/#organization` },
    },
    ...Object.values(PRODUCTS).map((p) => ({
      "@type": "SoftwareApplication",
      name: p.name,
      description: p.tagline,
      url: p.site ?? `${STUDIO.url}${p.path}`,
      applicationCategory: p.id === "office" ? "BusinessApplication" : p.id === "sentinel" ? "SecurityApplication" : "DeveloperApplication",
      operatingSystem: p.platforms
        .filter((x) => x.status === "available")
        .map((x) => (x.id === "web" ? "Web" : x.id === "android" ? "Android" : x.id))
        .join(", "),
      publisher: { "@id": `${STUDIO.url}/#organization` },
    })),
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <StudioHome />
    </>
  );
}
