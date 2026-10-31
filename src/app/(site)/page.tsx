import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { siteContent } from "@/content/site-content";
import { blogPosts } from "@/config/blog";
import "./core-pages-refresh.css";

export const metadata: Metadata = {
  title: "Kurarin Solutions | Software, Systems & Digital Products",
  description: "Kurarin Solutions designs and builds custom software, business systems, websites and automation that help organisations work better and grow with confidence.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Kurarin Solutions | Software, Systems & Digital Products",
    description: "Thoughtful software, connected systems and digital experiences for organisations ready to move forward.",
    url: "/",
    type: "website",
  },
};

const projects = [
  { name: "Orex Group Limited", type: "Construction · Corporate website", image: "/images/work/orex-group.webp", alt: "Orex Group Limited website project", href: "https://orexgroup.co.ke/", note: "A polished digital presence for a construction and precast solutions business." },
  { name: "BoB Van Transfers", type: "Travel · Digital platform", image: "/images/work/bob-van-transfers.webp", alt: "BoB Van Transfers website project", href: "https://bobvantransfers.co.ke/", note: "A customer-facing platform for transport, transfers and travel enquiries." },
  { name: "WAA SACCO", type: "Financial services · Membership", image: "/images/work/waa-sacco.webp", alt: "WAA SACCO website project", href: "https://waasacco.vercel.app/", note: "A clear online destination for a member-focused financial organisation." },
  { name: "Rook & Reed Juicery", type: "Food · Digital storefront", image: "/images/work/rook-reed-juicery.webp", alt: "Rook and Reed Juicery website project", href: "https://r-r-juicery.vercel.app/", note: "A product-led experience for a contemporary juicery brand." },
];

const process = [
  ["01", "Understand the work", "We begin with your goals, users, current processes and constraints. The aim is to solve the right problem, not simply introduce more technology."],
  ["02", "Shape the solution", "We map the experience, information and system requirements before settling on a practical direction, scope and delivery plan."],
  ["03", "Build with purpose", "We develop, integrate and test the solution with attention to usability, performance, security and the realities of day-to-day use."],
  ["04", "Improve over time", "A useful digital product is never just a launch. We help identify improvements as your organisation, customers and requirements evolve."],
];

const insightPosts = blogPosts.filter((post) => post.content).slice(0, 3);

export default function HomePage() {
  return (
    <main className="kcr-page kcr-home">
      <section className="kcr-hero">
        <div className="kcr-hero__copy">
          <p className="kcr-eyebrow">{siteContent.home.eyebrow}</p>
          <h1>Build better ways<br /><span>to work and grow.</span></h1>
          <p className="kcr-lead">We design and build software, business systems and digital experiences that make work clearer, services easier to access and organisations better equipped for what comes next.</p>
          <div className="kcr-actions">
            <Link className="kcr-button kcr-button--dark" href="/contact/">Start a conversation <span aria-hidden="true">↗</span></Link>
            <Link className="kcr-button kcr-button--light" href="/work/">Explore our work</Link>
          </div>
          <p className="kcr-supporting">SOFTWARE · SYSTEMS · AUTOMATION · CLOUD</p>
        </div>
        <div className="kcr-hero__visual" aria-label="Our approach to digital delivery">
          <div className="kcr-visual__top"><span>THE KURARIN APPROACH</span><span className="kcr-dot">●</span></div>
          <div className="kcr-visual__title">Make complexity<br />work for people.</div>
          <div className="kcr-workflow">
            <div><span>01</span><strong>Discover</strong><small>Understand needs</small></div><i aria-hidden="true">→</i>
            <div><span>02</span><strong>Design & build</strong><small>Create the system</small></div><i aria-hidden="true">→</i>
            <div><span>03</span><strong>Improve</strong><small>Deliver lasting value</small></div>
          </div>
          <div className="kcr-visual__bottom">Thoughtful technology. Practical outcomes.</div>
        </div>
      </section>

      <section className="kcr-trust-band" aria-label="Our focus">
        <span>BUILT AROUND YOUR WORK</span><b>Custom software</b><i /> <b>Connected systems</b><i /> <b>Useful digital experiences</b><i /> <b>Long-term thinking</b>
      </section>

      <section className="kcr-section kcr-home-intro">
        <div className="kcr-about-grid">
          <div><p className="kcr-eyebrow">A practical technology partner</p><h2>Technology should remove friction, not create more of it.</h2></div>
          <div>
            <p>When tools do not connect, routine work becomes harder than it needs to be. Information gets repeated, customers struggle to find what they need and teams spend time working around systems instead of using them.</p>
            <p>Kurarin Solutions helps organisations address those gaps. We bring strategy, design and engineering together to create digital products and dependable systems that fit the way people actually work.</p>
            <Link className="kcr-text-link" href="/about/">Get to know Kurarin ↗</Link>
          </div>
        </div>
      </section>

      <section className="kcr-section kcr-section--soft">
        <div className="kcr-section__intro">
          <p className="kcr-eyebrow">What we do</p>
          <h2>Technology for the work<br />that matters.</h2>
          <p>From a first website to a connected business platform, we help you choose the right level of technology for the challenge in front of you.</p>
        </div>
        <div className="kcr-pillar-grid">
          {siteContent.home.pillars.map((pillar, index) => (
            <article className="kcr-pillar" key={pillar.title}>
              <span className="kcr-index">0{index + 1}</span><p className="kcr-eyebrow">{pillar.title}</p>
              <h3>{pillar.subtitle}</h3><p>{pillar.description}</p>
            </article>
          ))}
        </div>
        <div className="kcr-service-list kcr-home-services">
          {siteContent.services.map((service, index) => (
            <Link className="kcr-service-row" href={`/services/${service.slug}/`} key={service.slug}>
              <span className="kcr-index">0{index + 1}</span>
              <span className="kcr-service-row__main"><strong>{service.title}</strong><small>{service.description}</small></span>
              <span className="kcr-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
        <div className="kcr-inline-link"><Link className="kcr-text-link" href="/services/">Explore all services ↗</Link></div>
      </section>

      <section className="kcr-section kcr-home-work">
        <div className="kcr-section__heading-row">
          <div><p className="kcr-eyebrow">Selected work</p><h2>Digital experiences<br />made for real organisations.</h2></div>
          <Link className="kcr-text-link" href="/work/">View the full portfolio ↗</Link>
        </div>
        <div className="kcr-home-project-grid">
          {projects.map((project, index) => (
            <a className="kcr-home-project" href={project.href} target="_blank" rel="noopener noreferrer" key={project.name}>
              <div className="kcr-home-project__image">
                <Image src={project.image} alt={project.alt} fill sizes="(max-width: 680px) 100vw, (max-width: 1050px) 50vw, 25vw" />
                <span>0{index + 1}</span><b>↗</b>
              </div>
              <p className="kcr-eyebrow">{project.type}</p><h3>{project.name}</h3><p>{project.note}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="kcr-section kcr-section--soft kcr-home-process">
        <div className="kcr-section__intro"><p className="kcr-eyebrow">How we work</p><h2>Clear thinking.<br />Careful delivery.</h2><p>Good outcomes come from understanding the context, making sound decisions and staying involved through delivery.</p></div>
        <div className="kcr-process-grid">
          {process.map(([number, title, description]) => <article className="kcr-process-step" key={number}><span className="kcr-index">{number}</span><h3>{title}</h3><p>{description}</p></article>)}
        </div>
      </section>

      <section className="kcr-section kcr-home-fit">
        <div className="kcr-section__heading-row"><div><p className="kcr-eyebrow">Where we add value</p><h2>Useful across different<br />kinds of work.</h2></div><p className="kcr-section__copy">We work with teams that need technology to support a clearer customer experience, stronger operations or a more reliable digital foundation.</p></div>
        <div className="kcr-fit-grid">
          <article><span>01</span><h3>Growing businesses</h3><p>Build a credible online presence, organise customer enquiries and replace repetitive manual tasks with dependable workflows.</p></article>
          <article><span>02</span><h3>Service organisations</h3><p>Make services easier to understand, access and manage through clear digital journeys and connected information.</p></article>
          <article><span>03</span><h3>Community & membership groups</h3><p>Give members, learners and stakeholders a useful place to find information, participate and stay connected.</p></article>
          <article><span>04</span><h3>Established teams</h3><p>Improve existing websites, integrate tools and modernise systems without losing sight of what already works.</p></article>
        </div>
      </section>

      {insightPosts.length > 0 && <section className="kcr-section kcr-home-insights">
        <div className="kcr-section__heading-row"><div><p className="kcr-eyebrow">From the journal</p><h2>Ideas for better<br />digital decisions.</h2></div><Link className="kcr-text-link" href="/blog/">Visit the journal ↗</Link></div>
        <div className="kcr-insight-grid">{insightPosts.map((post) => <article key={post.slug}><p className="kcr-eyebrow">{post.category} · {post.readMinutes} MIN READ</p><h3><Link href={`/blog/${post.slug}/`}>{post.title}</Link></h3><p>{post.excerpt}</p><Link className="kcr-text-link" href={`/blog/${post.slug}/`}>Read insight ↗</Link></article>)}</div>
      </section>}

      <section className="kcr-closing">
        <p className="kcr-eyebrow">Start with the challenge</p>
        <h2>Let's find a better way<br />to move your work forward.</h2>
        <p>Tell us what is slowing your team down, what you want to build or where your digital experience could work harder. We will help you identify a sensible next step.</p>
        <div className="kcr-actions"><Link className="kcr-button kcr-button--light" href="/contact/">Talk to our team <span aria-hidden="true">↗</span></Link><Link className="kcr-home-secondary-link" href="/faqs/">Read our FAQs</Link></div>
      </section>
    </main>
  );
}
