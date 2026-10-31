/**
 * Content source for the core Kurarin Solutions pages.
 * Copy is based on https://kurarin.vercel.app/ and consolidated to avoid repeated filler.
 * Adjust route imports to match the current application structure.
 */
export const siteContent = {
  positioning: {
    title: "Software infrastructure for growing businesses.",
    description:
      "Kurarin Solutions builds custom software, business systems, automation platforms and digital experiences that help organizations operate efficiently and scale confidently.",
    descriptor: "Software · Systems · Automation · Cloud",
    tagline: "Storing Knowledge, Delivering Solutions.",
  },
  home: {
    eyebrow: "Custom software · Cloud · Automation",
    title: "Software infrastructure for growing businesses.",
    lead:
      "Kurarin Solutions builds custom software, business systems, automation platforms and digital experiences that help organizations operate efficiently and scale confidently.",
    primaryCta: { label: "Start a project", href: "/contact/" },
    secondaryCta: { label: "View our work", href: "/work/" },
    pillars: [
      { title: "Software", subtitle: "Custom systems", description: "Web applications, internal tools, client portals and integrations designed around real workflows." },
      { title: "Cloud", subtitle: "Reliable infrastructure", description: "Deployments, databases, monitoring and foundations designed for performance and maintainability." },
      { title: "Automation", subtitle: "Smarter workflows", description: "Connected processes that reduce repetitive work and improve consistency." },
    ],
  },
  services: [
    { slug: "software-development", title: "Software Development", description: "Custom platforms and applications designed around how your business actually works.", capabilities: ["Web applications", "Enterprise systems", "Client portals", "APIs & integrations"] },
    { slug: "business-automation", title: "Business Automation", description: "Replace repetitive processes with connected workflows that save time and reduce operational overhead.", capabilities: ["Workflow automation", "Internal tools", "Data processing", "System integrations"] },
    { slug: "cloud-infrastructure", title: "Cloud & Infrastructure", description: "Reliable infrastructure engineered for performance, security and long-term growth.", capabilities: ["Cloud deployment", "Infrastructure", "Databases", "Monitoring & reliability"] },
    { slug: "digital-products", title: "Digital Products", description: "Turn ideas into polished digital products that are useful, intuitive and ready to grow.", capabilities: ["Product strategy", "UX & UI", "MVP development", "Product iteration"] },
  ],
  solutions: [
    { slug: "business-operations", title: "Business Operations", description: "Systems that connect and streamline your operations.", examples: ["Internal tools", "Workflow automation", "Data handoffs", "System integrations"] },
    { slug: "customer-experience", title: "Customer Experience", description: "Digital experiences designed around your customers.", examples: ["Websites", "Customer portals", "Booking flows", "Service platforms"] },
    { slug: "education", title: "Education", description: "Technology for modern learning organizations.", examples: ["Learning platforms", "Content management", "Education workflows", "Student and teacher access"] },
    { slug: "enterprise", title: "Enterprise", description: "Scalable platforms for growing organizations.", examples: ["Custom business applications", "Role-based workflows", "Integrations", "Operational dashboards"] },
    { slug: "ai-solutions", title: "AI Solutions", description: "Intelligent systems for practical business use.", examples: ["Conversational interfaces", "Assisted information workflows", "Intelligent product features", "Human-in-the-loop review"] },
    { slug: "digital-transformation", title: "Digital Transformation", description: "Move legacy processes into modern systems.", examples: ["Workflow mapping", "Replacing manual processes", "Connecting existing tools", "Incremental platform development"] },
  ],
  about: {
    title: "Technology built with intention.",
    lead: "Kurarin Solutions is a technology company focused on software, systems and digital infrastructure for organizations building what comes next.",
    principles: [
      { title: "Understand before building", description: "Ask the right questions, map the real workflow and define the outcome." },
      { title: "Design for change", description: "Build with the expectation that organizations, users and requirements evolve." },
      { title: "Prefer clarity over unnecessary complexity", description: "Good software should be understandable, maintainable and useful." },
      { title: "Treat launch as a beginning", description: "Review, support and iteration are part of creating durable digital products." },
    ],
  },
} as const;
