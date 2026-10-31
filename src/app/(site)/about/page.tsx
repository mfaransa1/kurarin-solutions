import type { Metadata } from "next";
import Link from "next/link";
import "./about-page.css";

export const metadata: Metadata = {
  title: "About Kurarin Solutions | Storing Knowledge, Delivering Solutions",
  description:
    "Learn about Kurarin Solutions, a Nairobi-based technology company building practical digital solutions through thoughtful design, engineering and collaboration.",
  alternates: { canonical: "/about/" },
};

const services = [
  { number: "01", title: "Web Design & Development", description: "Responsive business websites, custom web applications, e-commerce platforms, content management systems, redesigns and ongoing optimization." },
  { number: "02", title: "Mobile Application Development", description: "Android, iOS and cross-platform applications, user-centred interfaces, backend systems, API integrations, testing and maintenance." },
  { number: "03", title: "Custom Software Solutions", description: "Business applications, management systems, workflow automation, database design, integrations and process improvement." },
  { number: "04", title: "UI/UX & Digital Design", description: "Interface and experience design, wireframes, interactive prototypes, website and app redesign, and digital brand assets." },
  { number: "05", title: "IT Consultancy & Technical Support", description: "Technology advisory, systems analysis, implementation planning, platform evaluation, website maintenance and technical support." },
];

const approach = [
  { number: "01", title: "Understand before we build", description: "We learn about your objectives, challenges, users and expectations before recommending a solution." },
  { number: "02", title: "Design with purpose", description: "We value clear communication, intuitive experiences and design decisions that serve a real purpose." },
  { number: "03", title: "Build for quality", description: "We aim for solutions that are maintainable, secure, responsive and appropriate for their intended use." },
  { number: "04", title: "Collaborate throughout", description: "We share progress, involve clients in key decisions and seek feedback at meaningful stages." },
  { number: "05", title: "Improve continuously", description: "We keep learning and refining our work so solutions can adapt as technology and needs change." },
];

const values = [
  { title: "Innovation", description: "Exploring new ideas and technologies to find better ways to solve problems." },
  { title: "Integrity", description: "Working with honesty, transparency, responsibility and respect for commitments." },
  { title: "Excellence", description: "Striving for quality in our thinking, design, implementation and relationships." },
  { title: "Purpose", description: "Making technology useful by connecting it to meaningful needs and practical value." },
  { title: "Collaboration", description: "Working as partners and respecting each client's insight, goals and circumstances." },
  { title: "Continuous learning", description: "Treating knowledge as an evolving resource and remaining open to improvement." },
];

const reasons = [
  { title: "Built around your needs", description: "We take time to understand your objectives and tailor our approach instead of forcing every project into one template." },
  { title: "Practical, purposeful technology", description: "We focus on solutions that address real challenges, improve processes and support business objectives." },
  { title: "Design meets functionality", description: "We combine thoughtful design and technical implementation to create useful, accessible digital experiences." },
  { title: "A collaborative partnership", description: "Clear communication, client involvement and transparency are part of the project journey." },
  { title: "A foundation for growth", description: "We consider maintainability, scalability and future needs so your solution has room to evolve." },
];

function AboutArtwork() {
  return (
    <div className="about-art" aria-hidden="true">
      <div className="about-art__halo about-art__halo--one" />
      <div className="about-art__halo about-art__halo--two" />
      <div className="about-art__grid" />
      <div className="about-art__card">
        <div className="about-art__top"><span>KURARIN / PRINCIPLES</span><span className="about-art__live"><i /> IN PRACTICE</span></div>
        <div className="about-art__symbol"><span>K</span><b>知</b><i /></div>
        <p className="about-art__statement">Knowledge becomes<br /><em>something useful.</em></p>
        <div className="about-art__sequence"><span>OBSERVE</span><b>→</b><span>DESIGN</span><b>→</b><span>DELIVER</span></div>
        <div className="about-art__progress"><span /></div>
      </div>
      <span className="about-art__spark about-art__spark--one" />
      <span className="about-art__spark about-art__spark--two" />
      <span className="about-art__label">STORING KNOWLEDGE<br />DELIVERING SOLUTIONS</span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="about-refresh">
      <section className="about-hero">
        <div className="about-hero__inner">
          <div className="about-hero__copy">
            <p className="about-eyebrow"><span /> ABOUT KURARIN SOLUTIONS</p>
            <h1>Storing knowledge.<br /><span>Delivering solutions.</span></h1>
            <p className="about-hero__lead">Technology should do more than solve problems. It should create opportunities, simplify processes and lay the foundation for lasting growth.</p>
            <div className="about-hero__actions"><Link className="about-button about-button--dark" href="/contact/">Let’s work together <span aria-hidden="true">↗</span></Link><a className="about-button about-button--light" href="#our-story">Discover our story <span aria-hidden="true">↓</span></a></div>
            <p className="about-hero__location">NAIROBI, KENYA <span>·</span> TECHNOLOGY WITH PURPOSE</p>
          </div>
          <AboutArtwork />
        </div>
      </section>

      <section className="about-section about-story" id="our-story">
        <div className="about-section__label"><span>01 / OUR STORY</span><span>THE THINKING BEHIND THE NAME</span></div>
        <div className="about-story__grid">
          <div><p className="about-eyebrow">Inspired by knowledge. Defined by purpose.</p><h2>A name shaped by<br />what matters.</h2></div>
          <div className="about-prose">
            <p>Kurarin Solutions is a technology company based in Nairobi, Kenya. We help businesses, organizations and entrepreneurs turn ideas into practical digital solutions, combining technical expertise, thoughtful design and a problem-solving mindset.</p>
            <p>Our name draws inspiration from two Japanese elements. <em>Kura</em> (蔵 or 倉) refers to a storehouse or repository—a place where valuable resources are preserved. It reflects our belief that knowledge, ideas and information are assets that can be transformed into meaningful solutions.</p>
            <p><em>Rin</em> (凛), represented by this kanji, conveys dignity, strength, composure and distinction. These qualities reflect the professionalism, integrity, precision and commitment to excellence we aspire to bring to our work.</p>
            <p>Together, the name represents our philosophy: gather knowledge, apply technology thoughtfully and turn ideas into solutions that create value. It guides both the work we do and the relationships we build.</p>
            <p className="about-story__tagline">“Storing Knowledge, Delivering Solutions.”</p>
          </div>
        </div>
      </section>

      <section className="about-purpose">
        <div className="about-purpose__item"><p className="about-eyebrow">OUR MISSION</p><h2>Make technology work for people.</h2><p>To empower businesses and organizations with practical, reliable and thoughtfully designed technology solutions that improve efficiency, support innovation and unlock opportunities for growth.</p></div>
        <div className="about-purpose__item about-purpose__item--vision"><p className="about-eyebrow">OUR VISION</p><h2>Be a trusted technology partner.</h2><p>To be recognized in Kenya and beyond for transforming ideas into impactful digital solutions and making technology more accessible, useful and valuable to the people and organizations we serve.</p></div>
      </section>

      <section className="about-section about-services" id="what-we-do">
        <div className="about-section__heading"><div><p className="about-eyebrow">02 / WHAT WE DO</p><h2>Technology for the<br /><span>next step forward.</span></h2></div><p>From a first online presence to a custom digital product, we help turn business needs into useful, considered technology.</p></div>
        <div className="about-service-list">{services.map((service) => <article className="about-service" key={service.number}><span className="about-service__number">{service.number}</span><div><h3>{service.title}</h3><p>{service.description}</p></div><span className="about-service__arrow" aria-hidden="true">↗</span></article>)}</div>
        <div className="about-inline-cta"><span>Have a specific challenge in mind?</span><Link href="/services/">Explore our services ↗</Link></div>
      </section>

      <section className="about-section about-approach">
        <div className="about-section__heading"><div><p className="about-eyebrow">03 / OUR APPROACH</p><h2>Thoughtful from<br />first question to launch.</h2></div><p>Good outcomes come from understanding the problem, making deliberate decisions and working closely with the people who will use the solution.</p></div>
        <div className="about-approach__grid">{approach.map((item) => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
      </section>

      <section className="about-section about-values">
        <div className="about-section__heading"><div><p className="about-eyebrow">04 / OUR CORE VALUES</p><h2>The principles behind<br /><span>the product.</span></h2></div><p>Our values shape how we think, how we build and how we work with clients and partners.</p></div>
        <div className="about-values__grid">{values.map((value, index) => <article key={value.title}><span className="about-value__index">0{index + 1}</span><h3>{value.title}</h3><p>{value.description}</p></article>)}</div>
      </section>

      <section className="about-section about-why">
        <div className="about-why__intro"><p className="about-eyebrow">05 / WHY KURARIN</p><h2>More than technology.<br /><span>A considered partnership.</span></h2><p>We want every engagement to feel clear, collaborative and connected to what you are trying to achieve.</p></div>
        <div className="about-why__list">{reasons.map((reason, index) => <article key={reason.title}><span>0{index + 1}</span><div><h3>{reason.title}</h3><p>{reason.description}</p></div></article>)}</div>
      </section>

      <section className="about-audience"><div><p className="about-eyebrow">WHO WE SERVE</p><h2>For people building<br />what comes next.</h2></div><div><p>We work with entrepreneurs, small and medium-sized businesses, established organizations, startups and institutions looking to use technology more effectively.</p><p>Whether you are establishing your first online presence, modernizing an existing system or developing a new digital product, we aim to help you move from concept to implementation with clarity and purpose.</p></div></section>

      <section className="about-closing"><div className="about-closing__orb" aria-hidden="true"><span>KS</span></div><div className="about-closing__content"><p className="about-eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h2>Have an idea?<br /><span>Let’s bring it to life.</span></h2><p>Every great solution begins with an idea, a challenge or an opportunity waiting to be explored. Let’s understand your needs, explore the possibilities and build something meaningful.</p><Link className="about-button about-button--white" href="/contact/">Let’s build your next solution <span aria-hidden="true">↗</span></Link><div className="about-closing__contact"><span>KILIMANI, NAIROBI, KENYA</span><a href="mailto:info@kurarinsolutions.co.ke">info@kurarinsolutions.co.ke</a><a href="https://www.kurarinsolutions.co.ke/" target="_blank" rel="noopener noreferrer">kurarinsolutions.co.ke ↗</a></div></div></section>
      <footer className="about-signoff"><span>KURARIN SOLUTIONS</span><span>STORING KNOWLEDGE, DELIVERING SOLUTIONS.</span></footer>
    </main>
  );
}
