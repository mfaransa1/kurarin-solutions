import type { ServiceItem } from "@/components/marketing/ServiceCard";

export const services: ServiceItem[] = [
  {
    slug: "web-development",
    number: "01",
    title: "Web development",
    summary:
      "Plan and build useful, responsive web experiences that make it easier for people to understand your organisation and take action.",
    outcome: "Accessible interfaces, clear journeys, maintainable code, and a strong foundation for growth.",
    symbol: "↗",
  },
  {
    slug: "software-and-app-development",
    number: "02",
    title: "Software & app development",
    summary:
      "Turn a workflow or product idea into a considered digital tool shaped around its users and real operating needs.",
    outcome: "Well-scoped features, usable product experiences, and a maintainable technical foundation.",
    symbol: "⌘",
  },
  {
    slug: "cloud-and-devops",
    number: "03",
    title: "Cloud & DevOps",
    summary:
      "Improve how applications are deployed, operated, monitored, and maintained across their lifecycle.",
    outcome: "More repeatable releases, clearer operational practices, and infrastructure aligned with your needs.",
    symbol: "◎",
  },
  {
    slug: "cybersecurity",
    number: "04",
    title: "Cybersecurity",
    summary:
      "Identify practical security priorities and strengthen the everyday practices that help protect systems and information.",
    outcome: "A clearer view of risks, sensible safeguards, and security-aware working practices.",
    symbol: "⌑",
  },
  {
    slug: "ui-ux-and-product-design",
    number: "05",
    title: "UI/UX & product design",
    summary:
      "Make digital products easier to understand and use through thoughtful structure, research, and interface design.",
    outcome: "Clearer user journeys, accessible patterns, and design decisions grounded in user needs.",
    symbol: "✳",
  },
  {
    slug: "data-and-analytics",
    number: "06",
    title: "Data & analytics",
    summary:
      "Organise information and turn relevant data into insights that support better-informed decisions.",
    outcome: "More useful reporting, understandable measures, and a clearer path from data to action.",
    symbol: "▥",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
