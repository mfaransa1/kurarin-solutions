import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import "./work-page.css";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore selected websites and digital platforms built by Kurarin Solutions, from transport and education to chess, food, interiors and member services.",
  alternates: { canonical: "/work/" },
};

const projects = [
  {
    number: "01",
    name: "BoB Van Transfers",
    category: "Travel & transport",
    summary:
      "A customer-facing website for a transport service offering airport and hotel transfers, chauffeur-driven travel, group transport, city tours and excursions around Kenya.",
    contribution:
      "Designed to make services easier to explore, build confidence before booking, and give visitors a clear route to enquire about their journey.",
    image: "/images/work/bob-van-transfers.webp",
    alt: "BoB Van Transfers website preview",
    href: "https://bobvantransfers.co.ke/",
    label: "Visit live website",
  },
  {
    number: "02",
    name: "Southside House of Pawns",
    shortName: "SHoP Chess Club",
    category: "Community · Chess",
    summary:
      "A digital home for Southside House of Pawns, a community chess initiative built around learning, competition and creating more opportunities for players to connect.",
    contribution:
      "The website gives the club a central place to introduce its identity, communicate its mission and grow a stronger chess community.",
    image: "/images/work/shop-chess-club.webp",
    alt: "Southside House of Pawns chess club website preview",
    href: "https://shopchess.vercel.app/",
    label: "Explore SHoP",
  },
  {
    number: "03",
    name: "Rook & Reed Juicery",
    category: "Food & beverage",
    summary:
      "A contemporary digital storefront for a juicery, designed to bring its product range and brand experience together in one clear, welcoming place.",
    contribution:
      "The experience is structured to help customers discover products and give the business a flexible foundation for product, event and brand storytelling.",
    image: "/images/work/rook-reed-juicery.webp",
    alt: "Rook and Reed Juicery website preview",
    href: "https://r-r-juicery.vercel.app/",
    label: "Explore the juicery",
  },
  {
    number: "04",
    name: "Project Julliana",
    category: "Digital experience",
    summary:
      "A dedicated web experience for Project Julliana, bringing its content and presentation into a focused, accessible online destination.",
    contribution:
      "Built to give the project a distinct digital presence and a clear structure for visitors to understand what it offers.",
    image: "/images/work/project-julliana.webp",
    alt: "Project Julliana website preview",
    href: "https://project-julliana.onrender.com/",
    label: "Visit project",
  },
  {
    number: "05",
    name: "KLASWA Learning",
    category: "Education · Learning resources",
    summary:
      "An education-focused platform where students, teachers and parents can find learning resources and support learning beyond the classroom.",
    contribution:
      "The experience centres educational resources and serves multiple audiences, helping learners, educators and families find material relevant to their needs.",
    image: "/images/work/klaswa-learning.webp",
    alt: "KLASWA education website preview",
    href: "https://klaswa.vercel.app/",
    label: "Explore KLASWA",
  },
  {
    number: "06",
    name: "SmartFix Interior",
    category: "Interiors & home improvement",
    summary:
      "A web presence for an interior design and improvement business working across spaces such as kitchens, wardrobes, flooring, ceilings and home décor.",
    contribution:
      "Designed to present services in an organised way so homeowners and businesses can understand the offering and take the next step toward an enquiry.",
    image: "/images/work/smartfix-interior.webp",
    alt: "SmartFix Interior website preview",
    href: "https://smartfixinterior.co.ke/",
    label: "Visit SmartFix Interior",
  },
  {
    number: "07",
    name: "WAA SACCO",
    category: "Financial services · Membership",
    summary:
      "A digital presence for a savings and credit cooperative, helping visitors learn about the organisation and navigate information relevant to members and prospective members.",
    contribution:
      "The project focuses on clear information architecture for a trust-led service where people need to understand the organisation, its offerings and how to get in touch.",
    image: "/images/work/waa-sacco.webp",
    alt: "WAA SACCO website preview",
    href: "https://waasacco.vercel.app/",
    label: "Visit WAA SACCO",
  },
  {
    number: "08",
    name: "Orex Group Limited",
    category: "Construction · Corporate website",
    summary:
      "A corporate website for Orex Group Limited, a Kenyan construction and precast solutions business based in Kamakis along the Eastern Bypass.",
    contribution:
      "The digital experience presents the company, its construction-related services and project portfolio in a structured format, giving prospective clients a clear route to learn more and make contact.",
    image: "/images/work/orex-group.webp",
    alt: "Orex Group Limited corporate website preview",
    href: "https://orexgroup.co.ke/",
    label: "Visit Orex Group",
  },
];

function HeroArtwork() {
  return (
    <div className="work-hero-art" aria-hidden="true">
      <div className="work-hero-art__orbit work-hero-art__orbit--one" />
      <div className="work-hero-art__orbit work-hero-art__orbit--two" />
      <div className="work-hero-art__grid" />
      <div className="work-hero-art__panel">
        <div className="work-hero-art__panel-top">
          <span>SELECTED PROJECTS</span>
          <span className="work-hero-art__status"><i /> LIVE WORK</span>
        </div>
        <div className="work-hero-art__headline">Ideas into<br /><em>useful systems.</em></div>
        <div className="work-hero-art__steps">
          <div><b>01</b><span>Understand</span></div>
          <div><b>02</b><span>Design</span></div>
          <div><b>03</b><span>Build</span></div>
        </div>
        <div className="work-hero-art__line"><span /></div>
      </div>
      <span className="work-hero-art__dot work-hero-art__dot--one" />
      <span className="work-hero-art__dot work-hero-art__dot--two" />
    </div>
  );
}

export default function WorkPage() {
  return (
    <div className="work-page">
      <section className="work-hero">
        <div className="work-hero__inner">
          <div className="work-hero__copy">
            <p className="work-eyebrow">SELECTED WORK</p>
            <h1>Technology built<br /><span>for the real world.</span></h1>
            <p className="work-hero__lead">
              We design and build software, digital platforms and business systems
              around real problems, real organisations and the people who use them.
            </p>
            <div className="work-hero__actions">
              <Link className="work-button work-button--primary" href="/contact/">
                Discuss a project <span aria-hidden="true">↗</span>
              </Link>
              <Link className="work-button work-button--secondary" href="/services/">
                Explore our services
              </Link>
            </div>
          </div>
          <HeroArtwork />
        </div>
      </section>

      <section className="work-portfolio" aria-labelledby="work-portfolio-heading">
        <div className="work-portfolio__intro">
          <p className="work-eyebrow">PROJECT PORTFOLIO</p>
          <h2 id="work-portfolio-heading">Different challenges.<br />Thoughtful engineering.</h2>
          <p>
            A selection of websites and digital experiences created for different
            audiences and industries. Open each live project to explore it in context.
          </p>
        </div>

        <div className="work-project-grid">
          {projects.map((project) => (
            <article className="work-project" key={project.number}>
              <a
                className="work-project__visual"
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.label}: ${project.name} (opens in a new tab)`}
              >
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 42vw"
                  className="work-project__image"
                />
                <span className="work-project__number">{project.number}</span>
                <span className="work-project__view">View live ↗</span>
              </a>
              <div className="work-project__content">
                <div className="work-project__meta">
                  <span>{project.category}</span>
                  <span>{project.number} / 08</span>
                </div>
                <h3>{project.shortName ?? project.name}</h3>
                <p className="work-project__summary">{project.summary}</p>
                <p className="work-project__contribution">{project.contribution}</p>
                <a className="work-project__link" href={project.href} target="_blank" rel="noopener noreferrer">
                  {project.label} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="work-cta">
        <div>
          <p className="work-eyebrow">HAVE A CHALLENGE IN MIND?</p>
          <h2>Let’s build something<br /><span>that works for you.</span></h2>
        </div>
        <Link className="work-button work-button--light" href="/contact/">
          Talk to our team <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
