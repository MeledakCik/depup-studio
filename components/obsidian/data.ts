export type Category = "cloud" | "productivity" | "security" | "creative" | "developer";

export type Accent = "sky" | "pink" | "green" | "titanium";

export interface SystemItem {
  id: string;
  num: string;
  name: string;
  category: Category;
  badge: string;
  description: string;
  tagLabel: string;
  tags: string[];
  accent: Accent;
  featured?: boolean;
  href?: string;
  external?: boolean;
  cta: string;
  specs: [string, string][];
  detail: string;
}

export const CATEGORIES: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All Systems" },
  { id: "cloud", label: "Cloud & MCP" },
  { id: "productivity", label: "Productivity" },
  { id: "security", label: "Security" },
  { id: "creative", label: "Creative & Media" },
  { id: "developer", label: "Developer & OS" },
];

export const SYSTEMS: SystemItem[] = [
  {
    id: "cloud",
    num: "01",
    name: "depup.cloud",
    category: "cloud",
    badge: "Flagship Cloud & Remote MCP",
    description:
      "Multi-tenant cloud deployment, hosting management, and remote Model Context Protocol infrastructure engineered for resilient scale.",
    tagLabel: "Available on",
    tags: ["depup.cloud", "depup.web.id", "MCP Connectors", "Supabase Auth"],
    accent: "sky",
    featured: true,
    href: "/cloud",
    cta: "Explore depup.cloud",
    specs: [
      ["Runtime", "Managed Edge Protocol"],
      ["Auth", "Supabase Auth"],
      ["Protocol", "Remote MCP"],
      ["Tenancy", "Multi-tenant"],
    ],
    detail:
      "depup.cloud is the connective layer of the studio: deployments, hosting and remote MCP gateways managed from one console, so agents and teams reach the tools they need without exposing private networks.",
  },
  {
    id: "office",
    num: "02",
    name: "depup Office",
    category: "productivity",
    badge: "Document & Productivity",
    description:
      "Document scanner and productivity suite across Android Kotlin and standalone Windows .NET 8.0 with hardware acceleration.",
    tagLabel: "Platforms",
    tags: ["Android", "iOS · macOS · Windows soon"],
    accent: "titanium",
    href: "/office",
    cta: "Explore depup Office",
    specs: [
      ["Android", "Kotlin native"],
      ["Desktop", "Windows .NET 8.0"],
      ["Processing", "On-device"],
      ["Distribution", "Google Play"],
    ],
    detail:
      "Documents, spreadsheets, presentations and PDF in one suite. Capture and process locally with high-fidelity scanning, then continue on the desktop.",
  },
  {
    id: "sentinel",
    num: "03",
    name: "Sentinel-ID",
    category: "security",
    badge: "Passive Auditing",
    description:
      "Auditor keamanan pasif untuk domain milik sendiri. GET-only, same-origin, dan dibatasi maksimal 100 request per scan.",
    tagLabel: "Prinsip",
    tags: ["GET-only", "Same-origin", "Manual review"],
    accent: "pink",
    href: "/sentinel",
    cta: "Explore Sentinel-ID",
    specs: [
      ["Method", "GET-only"],
      ["Scope", "Same-origin"],
      ["Rate envelope", "≤ 100 req / scan"],
      ["Review", "Manual, owner-led"],
    ],
    detail:
      "A careful auditor for domains you own. Sentinel-ID never writes, never crawls off-origin and stops at a hard request ceiling, leaving every decision to the owner.",
  },
  {
    id: "motionku",
    num: "04",
    name: "MotionKu",
    category: "creative",
    badge: "Motion Graphics",
    description:
      "AI-powered short-form motion graphic studio with Hooke spring physics and Canvas MediaRecorder export engine.",
    tagLabel: "Capabilities",
    tags: ["24 Scene Engine", "AudioContext"],
    accent: "green",
    cta: "View project notes",
    specs: [
      ["Scenes", "24 templates"],
      ["Physics", "Hooke springs"],
      ["Export", "Canvas MediaRecorder"],
      ["Audio", "Web AudioContext"],
    ],
    detail:
      "Short-form motion built on spring physics: every element settles naturally, scenes sync to the audio spectrum, and exports render straight from the canvas.",
  },
  {
    id: "dvibes",
    num: "05",
    name: "DVibes",
    category: "creative",
    badge: "Audio Streaming",
    description:
      "Cross-platform ad-free desktop and mobile music app built with Tauri 2, Next.js, and Howler.js audio orchestration.",
    tagLabel: "Sources",
    tags: ["Audius", "Offline Cache"],
    accent: "green",
    cta: "View project notes",
    specs: [
      ["Shell", "Tauri 2"],
      ["UI", "Next.js"],
      ["Audio", "Howler.js"],
      ["Library", "Audius + offline cache"],
    ],
    detail:
      "An ad-free player for desktop and mobile with a lightweight native shell, offline caching and gapless playback orchestration.",
  },
  {
    id: "kasyaf",
    num: "06",
    name: "Kasyaf Redis Cloud",
    category: "cloud",
    badge: "Serverless Data",
    description:
      "Lightweight multi-tenant serverless Redis and Qdrant vector database console deployed for low-latency workloads.",
    tagLabel: "Stack",
    tags: ["ioredis", "Qdrant Vector"],
    accent: "sky",
    cta: "See how it works",
    specs: [
      ["Cache", "ioredis memory pool"],
      ["Vectors", "Qdrant"],
      ["Uptime", "99.98%"],
      ["Latency", "~12 ms edge"],
    ],
    detail:
      "A compact console for serverless Redis and vector workloads: tenants are isolated, connections pooled, and vectors stream into Qdrant close to where they are queried.",
  },
  {
    id: "code",
    num: "07",
    name: "Depup Code",
    category: "developer",
    badge: "Hybrid Workspace",
    description:
      "Offline-first hybrid web and desktop IDE combining VS Code ergonomics with depup.cloud deployment automation.",
    tagLabel: "Features",
    tags: ["IndexedDB Cache", "Direct Deploy"],
    accent: "titanium",
    cta: "See how it works",
    specs: [
      ["State", "IndexedDB local-first"],
      ["Sync", "Instant cloud toggle"],
      ["Deploy", "depup.cloud direct"],
      ["Mode", "Web + desktop"],
    ],
    detail:
      "Write code with the network gone. Depup Code keeps the workspace locally, syncs when you choose, and ships straight to depup.cloud.",
  },
  {
    id: "cikai",
    num: "08",
    name: "CikAi Gateway & Core Architecture",
    category: "developer",
    badge: "Gateway Unified Inference",
    description:
      "Multi-model AI routing gateway engineered for deterministic fallback, rate limiting, and developer observability.",
    tagLabel: "Explore modules",
    tags: ["Express TypeScript", "Model Router", "Token Guard", "Health Probes"],
    accent: "sky",
    cta: "See how it works",
    specs: [
      ["Server", "Express + TypeScript"],
      ["Routing", "Deterministic fallback"],
      ["Limits", "Token Guard"],
      ["Health", "Active probes"],
    ],
    detail:
      "One endpoint in front of many models. CikAi routes each request, falls back predictably when a provider fails, and reports what happened.",
  },
  {
    id: "os",
    num: "09",
    name: "Depup OS Dev Edition",
    category: "developer",
    badge: "Open Tooling Developer OS",
    description:
      "Customized lightweight Windows 11 IoT LTSC developer operating system image with automated CLI provisioning.",
    tagLabel: "Build with Depup",
    tags: ["depup.bat CLI", "NTLite Profile", "Dev ISO"],
    accent: "titanium",
    cta: "See how it works",
    specs: [
      ["Base", "Windows 11 IoT LTSC"],
      ["Provisioning", "depup.bat CLI"],
      ["Profile", "NTLite"],
      ["Output", "Dev ISO"],
    ],
    detail:
      "A lean developer image that boots into a ready workspace: tooling installed by one CLI, nothing extra running in the background.",
  },
];

export interface Principle {
  id: string;
  tag: string;
  status: string;
  shortTitle: string;
  shortDesc: string;
  badge: string;
  color: string;
  glow: string;
  title: string;
  desc: string;
  linksHeading: string;
  links: { label: string; href: string; external?: boolean }[];
  metrics: [string, string][];
}

export const PRINCIPLES: Principle[] = [
  {
    id: "01",
    tag: "01 / Connect",
    status: "Active",
    shortTitle: "Remote MCP Cloud",
    shortDesc: "A managed path between apps, teams, and the tools they rely on.",
    badge: "REMOTE · 01 / Connect",
    color: "#abc7ff",
    glow: "rgba(0, 113, 227, 0.32)",
    title: "Remote MCP Cloud",
    desc: "A managed path between apps, teams, and the tools they rely on. Unifying Model Context Protocol execution without risking credentials or private network exposure.",
    linksHeading: "Built across a connected platform",
    links: [
      { label: "depup.cloud", href: "https://depup.cloud", external: true },
      { label: "depup.web.id", href: "https://depup.web.id", external: true },
      { label: "GitHub", href: "https://github.com/MeledakCik", external: true },
    ],
    metrics: [
      ["MCP latency", "12ms"],
      ["Credential exposure", "0"],
      ["Connectors", "MCP"],
    ],
  },
  {
    id: "02",
    tag: "02 / Protect",
    status: "Enclave",
    shortTitle: "Zero-Trust Proof Vault",
    shortDesc: "Passive non-invasive scans bounded by deterministic GET limits.",
    badge: "SECURITY · 02 / Protect",
    color: "#fab4c0",
    glow: "rgba(109, 57, 69, 0.55)",
    title: "Zero-Trust Proof Vault",
    desc: "Passive, non-invasive zero-trust validation engines. Same-origin bounds, GET-only query architectures, and strict rate envelopes prioritizing system integrity.",
    linksHeading: "Audited deterministic perimeter",
    links: [
      { label: "Sentinel-ID", href: "/sentinel" },
      { label: "sentinel-id.net", href: "https://sentinel-id.net", external: true },
      { label: "Audit source", href: "https://github.com/MeledakCik/audit-otomatis", external: true },
    ],
    metrics: [
      ["Method", "GET"],
      ["Request ceiling", "100"],
      ["Scope", "1 origin"],
    ],
  },
  {
    id: "03",
    tag: "03 / Deliver",
    status: "Edge",
    shortTitle: "Edge Latency",
    shortDesc: "Lightweight serverless vector caching nearest to execution points.",
    badge: "PERFORMANCE · 03 / Deliver",
    color: "#abc7ff",
    glow: "rgba(0, 113, 227, 0.28)",
    title: "Edge Latency & Vector Engine",
    desc: "Lightweight serverless vector caching nearest to execution points. Multi-tenant Redis clusters and Qdrant vector stream indexing with sub-12ms response.",
    linksHeading: "Telemetry and memory fabric",
    links: [
      { label: "Kasyaf Cloud", href: "#system:kasyaf" },
      { label: "Edge Mesh", href: "#systems" },
      { label: "depup.cloud", href: "https://depup.cloud", external: true },
    ],
    metrics: [
      ["Response", "<12ms"],
      ["Uptime", "99.98%"],
      ["Stores", "Redis + Qdrant"],
    ],
  },
  {
    id: "04",
    tag: "04 / Create",
    status: "Canvas",
    shortTitle: "Procedural Motion",
    shortDesc: "Hooke spring physics driving deterministic 60fps frame pipelines.",
    badge: "ENGINEERING · 04 / Create",
    color: "#30d158",
    glow: "rgba(48, 209, 88, 0.2)",
    title: "Procedural Motion & Spring Physics",
    desc: "Deterministic 60fps frame pipelines featuring Hooke spring damping and synchronous Web Audio spectrum triggers.",
    linksHeading: "Media generation & canvas engine",
    links: [
      { label: "MotionKu Studio", href: "#system:motionku" },
      { label: "DVibes", href: "#system:dvibes" },
    ],
    metrics: [
      ["Frame rate", "60fps"],
      ["Scenes", "24"],
      ["Export", "Canvas"],
    ],
  },
  {
    id: "05",
    tag: "05 / Continue",
    status: "Offline",
    shortTitle: "Offline-First Tooling",
    shortDesc: "Local-first client state resilient against full network partitions.",
    badge: "RESILIENCE · 05 / Continue",
    color: "#e2e2e6",
    glow: "rgba(255, 255, 255, 0.14)",
    title: "Offline-First Tooling",
    desc: "Local-first client state resilient against full network partitions. Zero-latency IndexedDB local state with instant cloud sync toggles.",
    linksHeading: "Air-gapped and hybrid runtime",
    links: [
      { label: "Depup Code", href: "#system:code" },
      { label: "depup Office", href: "/office" },
      { label: "Depup OS", href: "#system:os" },
    ],
    metrics: [
      ["Network needed", "None"],
      ["Local state", "IndexedDB"],
      ["Sync", "On demand"],
    ],
  },
];

export interface UpdateItem {
  num: string;
  area: string;
  month: "November" | "October";
  title: string;
  body: string;
  accent: Accent;
  systemId: string;
}

export const UPDATES: UpdateItem[] = [
  {
    num: "01",
    area: "Cloud",
    month: "November",
    title: "Introducing depup.cloud Remote MCP Gateway",
    body: "Native cloud connector bridging local model agents directly to distributed cloud instances with authenticated session vaults.",
    accent: "sky",
    systemId: "cloud",
  },
  {
    num: "02",
    area: "Security",
    month: "November",
    title: "Sentinel-ID adds encrypted proof review",
    body: "Automated cryptographic audit certificates verifying passive scan constraints without storing raw perimeter telemetry.",
    accent: "pink",
    systemId: "sentinel",
  },
  {
    num: "03",
    area: "Desktop",
    month: "October",
    title: "depup Office brings document work to Windows",
    body: "Standalone Windows .NET 8.0 deployment with hardware-accelerated direct vector processing and multi-page batch recognition.",
    accent: "titanium",
    systemId: "office",
  },
  {
    num: "04",
    area: "Creative",
    month: "November",
    title: "MotionKu v2 introduces spring-driven scenes",
    body: "Rebuilt rendering pipeline featuring real-time Hooke spring dampening and synchronous Web Audio spectrum triggers.",
    accent: "green",
    systemId: "motionku",
  },
  {
    num: "05",
    area: "Developer",
    month: "November",
    title: "Depup Code: an offline-first hybrid IDE",
    body: "Zero-latency IndexedDB local state with instant cloud sync toggles for air-gapped developer environments.",
    accent: "titanium",
    systemId: "code",
  },
  {
    num: "06",
    area: "Systems",
    month: "October",
    title: "Depup OS Dev Edition for a lighter workflow",
    body: "Stripped down Windows 11 IoT LTSC baseline equipped with depup.bat automated workspace provisioning.",
    accent: "titanium",
    systemId: "os",
  },
];

export const NOTES = [
  {
    num: "01",
    area: "Infrastructure",
    accent: "sky" as Accent,
    title: "A clearer path between tools and teams",
    body: "Remote MCP gateways bring cloud workspaces and connected tools into one managed flow without centralized vulnerability points.",
    more: "Instead of every agent holding its own keys, the gateway brokers each call. Credentials stay in one vault, access is scoped per workspace, and a revoked token stops working everywhere at once.",
    systemId: "cloud",
  },
  {
    num: "02",
    area: "Security",
    accent: "pink" as Accent,
    title: "Security reviews built for careful decisions",
    body: "Auditing infrastructure that favors deterministic constraints, transparency, and owner control over automated reckless intervention.",
    more: "A scan that cannot write, cannot leave the origin and stops at a fixed ceiling is a scan an owner can run without worry. The findings arrive as evidence for a person to judge, not as automatic changes.",
    systemId: "sentinel",
  },
  {
    num: "03",
    area: "Productivity",
    accent: "titanium" as Accent,
    title: "Document work that follows you",
    body: "Removing the cloud dependency from basic document capture. Fast, local processing with high fidelity scanning on handheld hardware.",
    more: "Capture happens on the device, so a scan works on a plane or in a basement. When you are back online, the same files continue on Windows without a conversion step.",
    systemId: "office",
  },
];

export const ACCENT_TEXT: Record<Accent, string> = {
  sky: "text-obs-sky",
  pink: "text-obs-pink",
  green: "text-obs-green",
  titanium: "text-obs-titanium",
};

export const ACCENT_HEX: Record<Accent, string> = {
  sky: "#abc7ff",
  pink: "#fab4c0",
  green: "#30d158",
  titanium: "#e2e2e6",
};
