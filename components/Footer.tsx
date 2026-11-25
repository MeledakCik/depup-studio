import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const linkGroups = [
  {
    title: "Platforms",
    links: [
      { label: "depup.cloud", href: "https://depup.cloud", external: true },
      { label: "depup.web.id", href: "https://depup.web.id", external: true },
      { label: "Depup Code", href: "#ecosystem" },
      { label: "CikAi Gateway", href: "#ecosystem" },
    ],
  },
  {
    title: "Productivity",
    links: [
      { label: "depup Office", href: "/office" },
      { label: "MotionKu", href: "#ecosystem" },
      { label: "DVibes", href: "#ecosystem" },
    ],
  },
  {
    title: "Security",
    links: [
      { label: "Sentinel-ID", href: "/sentinel" },
      { label: "Visit sentinel-id.net", href: "https://sentinel-id.net", external: true },
      { label: "Safety approach", href: "/sentinel#safety" },
    ],
  },
  {
    title: "Infrastructure",
    links: [
      { label: "Kasyaf Redis Cloud", href: "#ecosystem" },
      { label: "Depup OS Dev", href: "#ecosystem" },
      { label: "API Status", href: "/api/status" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="studio-footer">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16">
        <ScrollReveal variant="left" className="footer-topline">
          <a href="#spotlight" className="footer-brand" aria-label="Depup Studio home">
            <span className="footer-brand-mark">D</span>
            <span>Depup Studio</span>
          </a>
          <a href="#mission" className="footer-back-top">The studio <ArrowRight /></a>
        </ScrollReveal>

        <div className="footer-main">
          <ScrollReveal variant="left" className="footer-statement">
            <p>Independent by nature.<br />Connected by design.</p>
            <a href="#ecosystem">Discover what we build <ArrowUpRight /></a>
          </ScrollReveal>
          <ScrollReveal variant="right" className="footer-link-groups">
            {linkGroups.map((group) => (
              <div key={group.title} className="footer-link-group">
                <h3>{group.title}</h3>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined}>
                        {link.label}{link.external && <ArrowUpRight aria-hidden="true" />}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ScrollReveal>
        </div>

        <ScrollReveal variant="rise" className="footer-bottom">
          <div className="footer-bottom-links">
            <a href="#spotlight">Overview</a>
            <a href="#updates">Latest work</a>
            <a href="/privacy">Privacy</a>
          </div>
          <span>© {new Date().getFullYear()} Depup Studio. Made with intent.</span>
        </ScrollReveal>
      </div>
    </footer>
  );
}
