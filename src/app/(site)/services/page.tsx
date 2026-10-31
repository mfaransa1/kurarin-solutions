import Link from "next/link";
import type { Metadata } from "next";
import { siteContent } from "@/content/site-content";
import "./services-refresh.css";

export const metadata: Metadata = {
  title: "Services | Kurarin Solutions",
  description: "Purposeful software, automation, cloud infrastructure and digital product services for businesses and organizations in Kenya and beyond.",
  alternates: { canonical: "/services/" },
};

const serviceDetails: Record<string, { number: string; kicker: string; outcomes: string[]; accent: string }> = {
  "software-development": { number: "01", kicker: "Software that fits the way you work", outcomes: ["Custom web applications", "Business and management systems", "Portals, APIs and integrations"], accent: "software" },
  "business-automation": { number: "02", kicker: "Less repetition. Better flow.", outcomes: ["Workflow automation", "Connected tools and data", "Internal operations dashboards"], accent: "automation" },
  "cloud-infrastructure": { number: "03", kicker: "A stronger foundation for digital work", outcomes: ["Cloud deployment and configuration", "Database and environment setup", "Monitoring, reliability and maintenance"], accent: "cloud" },
  "digital-products": { number: "04", kicker: "From early idea to useful experience", outcomes: ["Product discovery and planning", "UX/UI and interactive prototypes", "MVPs, testing and iteration"], accent: "products" },
};

function ServiceArtwork() {
  return <div className="ks-artwork" aria-label="Abstract animated illustration of connected digital systems" role="img">
    <div className="ks-artwork__grid" />
    <div className="ks-artwork__orbit ks-artwork__orbit--one" /><div className="ks-artwork__orbit ks-artwork__orbit--two" />
    <div className="ks-artwork__core"><span>KS</span><small>IDEA → IMPACT</small></div>
    <div className="ks-artwork__node ks-artwork__node--one"><i />Plan</div><div className="ks-artwork__node ks-artwork__node--two"><i />Build</div><div className="ks-artwork__node ks-artwork__node--three"><i />Improve</div>
    <div className="ks-artwork__status"><span className="ks-live-dot" /> Connected thinking <b>01—04</b></div>
  </div>;
}

export default function ServicesPage() {
  return <main className="ks-services">
    <section className="ks-services-hero">
      <div className="ks-services-hero__copy"><p className="ks-eyebrow">What we do / Services</p><h1>Technology should make <em>progress</em> practical.</h1><p className="ks-lead">We turn business challenges and promising ideas into useful software, connected workflows and digital products built around real needs.</p><div className="ks-actions"><Link className="ks-button ks-button--dark" href="/contact/">Discuss your project <span>↗</span></Link><Link className="ks-button ks-button--light" href="/work/">Explore our work <span>↗</span></Link></div><p className="ks-location-note">Nairobi, Kenya · Working with ideas at every stage</p></div>
      <ServiceArtwork />
    </section>
    <section className="ks-services-intro"><div><p className="ks-eyebrow">Our capabilities</p><h2>Choose a starting point.<br/>We’ll work out the right fit.</h2></div><p>Every organization is different. We listen first, define the real challenge, then bring together the right mix of design, engineering and technical guidance.</p></section>
    <section className="ks-service-catalog" aria-label="Kurarin Solutions services">
      {siteContent.services.map((service, index) => { const detail = serviceDetails[service.slug]; return <article className={`ks-service-card ks-service-card--${detail?.accent ?? "software"}`} key={service.slug}>
        <div className="ks-service-card__top"><span className="ks-service-number">{detail?.number ?? `0${index + 1}`}</span><span className="ks-service-card__mark" aria-hidden="true">{["↗", "⤴", "◌", "✳"][index % 4]}</span></div>
        <div className="ks-service-card__body"><p className="ks-eyebrow">{detail?.kicker ?? "Built around your goals"}</p><h2>{service.title}<span>.</span></h2><p>{service.description}</p><ul>{service.capabilities.map(item => <li key={item}>{item}</li>)}</ul><Link className="ks-text-link" href={`/services/${service.slug}/`}>Explore this service <span>↗</span></Link></div>
        <div className="ks-service-card__graphic" aria-hidden="true"><span className="ks-graphic-line ks-graphic-line--a"/><span className="ks-graphic-line ks-graphic-line--b"/><span className="ks-graphic-square"/><span className="ks-graphic-dot"/><span className="ks-graphic-label">{detail?.number ?? `0${index + 1}`} / KURARIN</span></div>
      </article>; })}
    </section>
    <section className="ks-delivery"><div className="ks-delivery__heading"><p className="ks-eyebrow">A thoughtful process</p><h2>Understand first.<br/><span>Build with purpose.</span></h2><p>Good technology starts with clarity, not complexity. Our process keeps the problem, the people and the outcome in view.</p></div><div className="ks-delivery__steps">{[["01","Understand","We learn about your goals, users, current systems and constraints."],["02","Shape the solution","We agree on priorities, scope and a practical route forward."],["03","Build and review","We develop in manageable steps, test assumptions and use feedback."],["04","Launch and improve","We plan the handover and help identify meaningful next improvements."]].map(([n,t,d])=><article key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div><b aria-hidden="true">↗</b></article>)}</div></section>
    <section className="ks-services-cta"><div><p className="ks-eyebrow">Have a challenge in mind?</p><h2>Let’s make the next step clear.</h2><p>Tell us what you are trying to achieve. We’ll help you explore a solution that fits your needs and resources.</p></div><Link className="ks-button ks-button--white" href="/contact/">Talk to Kurarin <span>↗</span></Link></section>
  </main>;
}
