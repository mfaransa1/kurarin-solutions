import type { Metadata } from "next";
import Link from "next/link";
import "./solutions-refresh.css";

export const metadata: Metadata = {
  title: "Solutions | Kurarin Solutions",
  description: "Practical digital solutions for businesses, teams and organizations—from stronger online experiences to connected systems and smarter workflows.",
  alternates: { canonical: "/solutions/" },
};

const solutions = [
  { number: "01", title: "Build your digital presence", description: "Create a credible, accessible online home that explains what you do and helps the right people take the next step.", fit: "For businesses, startups and organizations", items: ["Business and corporate websites", "E-commerce and customer portals", "Content-managed websites"], href: "/services/software-development/", label: "Explore web development" },
  { number: "02", title: "Make work flow better", description: "Replace disconnected manual tasks with clearer processes, useful data and systems that support your team.", fit: "For growing teams and operations", items: ["Workflow automation", "Management and administration systems", "Database and platform integrations"], href: "/services/business-automation/", label: "Explore business automation" },
  { number: "03", title: "Turn an idea into a product", description: "Move from an early concept to a considered digital experience, with practical milestones and a focus on real users.", fit: "For founders and product teams", items: ["Product discovery and planning", "Interface design and prototypes", "MVP and application development"], href: "/services/digital-products/", label: "Explore digital products" },
  { number: "04", title: "Build on a dependable foundation", description: "Plan and maintain the technical foundations that help your digital services stay available, maintainable and ready to evolve.", fit: "For teams modernizing technology", items: ["Cloud deployment and hosting", "Technical reviews and advisory", "Maintenance and reliability planning"], href: "/services/cloud-infrastructure/", label: "Explore cloud and infrastructure" },
];

export default function SolutionsPage() {
  return <main className="ks-solutions">
    <section className="ks-solutions-hero">
      <div className="ks-solutions-hero__copy"><p className="ks-eyebrow"><span /> SOLUTIONS BUILT AROUND REAL NEEDS</p><h1>Make technology<br />work <em>for you.</em></h1><p className="ks-solutions-lede">From the first online presence to the systems behind a growing organization, we turn business challenges into practical digital solutions.</p><div className="ks-actions"><Link className="ks-button ks-button--dark" href="/contact/">Discuss your project <span>↗</span></Link><Link className="ks-text-link" href="/services/">Explore our services <span>→</span></Link></div><div className="ks-solutions-meta"><span>NAIROBI, KENYA</span><span>THOUGHTFUL BY DESIGN. PRACTICAL BY NATURE.</span></div></div>
      <div className="ks-solutions-art" aria-label="Abstract animated system of connected ideas" role="img"><div className="ks-art-grid"/><div className="ks-art-orbit ks-art-orbit--one"/><div className="ks-art-orbit ks-art-orbit--two"/><div className="ks-art-core"><span>K</span><small>IDEA → IMPACT</small></div><i className="ks-art-node ks-art-node--a"/><i className="ks-art-node ks-art-node--b"/><i className="ks-art-node ks-art-node--c"/><div className="ks-art-note"><span className="ks-art-note__dot"/> Clear problem. Useful solution.</div><div className="ks-art-index">KS / 01—04</div></div>
    </section>
    <section className="ks-solutions-intro"><p className="ks-eyebrow"><span /> HOW WE CAN HELP</p><div><h2>Good technology starts with the <em>right question.</em></h2><p>Every organization has its own goals, constraints and opportunities. We listen first, then shape a solution around what will make a meaningful difference—not complexity for its own sake.</p></div></section>
    <section className="ks-solutions-grid">{solutions.map((s) => <article className="ks-solution-card" key={s.number}><div className="ks-solution-card__top"><span>{s.number}</span><span aria-hidden="true">↗</span></div><h3>{s.title}</h3><p>{s.description}</p><small>{s.fit}</small><ul>{s.items.map((item) => <li key={item}>{item}</li>)}</ul><Link href={s.href}>{s.label} <span>→</span></Link></article>)}</section>
    <section className="ks-solution-process"><div><p className="ks-eyebrow"><span /> A CLEAR WAY FORWARD</p><h2>From uncertainty<br />to <em>next steps.</em></h2><p>We keep the work collaborative and the decisions understandable.</p></div><ol><li><span>01</span><div><h3>Understand</h3><p>Clarify your goals, users, current challenges and constraints.</p></div></li><li><span>02</span><div><h3>Shape the solution</h3><p>Agree on scope, priorities, approach and what success should look like.</p></div></li><li><span>03</span><div><h3>Design and build</h3><p>Develop, review and refine the solution with your feedback.</p></div></li><li><span>04</span><div><h3>Launch and improve</h3><p>Prepare for use and identify sensible next improvements.</p></div></li></ol></section>
    <section className="ks-solutions-cta"><div><p className="ks-eyebrow"><span /> YOUR NEXT STEP</p><h2>Have a challenge<br />worth <em>solving?</em></h2></div><div><p>Tell us what you want to improve or create. We’ll help you explore the practical options.</p><Link className="ks-button ks-button--light" href="/contact/">Let’s talk about it <span>↗</span></Link></div></section>
  </main>;
}
