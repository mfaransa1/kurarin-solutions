import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";

const capabilities = [
  {
    number: "01",
    title: "Digital experiences",
    description:
      "Useful, accessible websites and digital products shaped around real customer needs.",
  },
  {
    number: "02",
    title: "Software & applications",
    description:
      "Purpose-built software and applications that help teams work smarter and serve people better.",
  },
  {
    number: "03",
    title: "Cloud & technology",
    description:
      "Reliable infrastructure, integrations, and technical guidance for growing organisations.",
  },
];

export default function HomePage() {
  return (
    <>
      <Section className="hero">
        <div className="hero__glow hero__glow--one" aria-hidden="true" />
        <div className="hero__glow hero__glow--two" aria-hidden="true" />
        <Container>
          <div className="hero__content">
            <p className="eyebrow"><span /> Technology with purpose</p>
            <h1 className="hero__title">
              Good ideas deserve
              <span> thoughtful solutions.</span>
            </h1>
            <p className="hero__description">
              We help organisations turn challenges into clear, useful digital
              experiences and technology that moves work forward.
            </p>
            <div className="hero__actions">
              <ButtonLink href="/contact/">Discuss your project <span aria-hidden="true">↗</span></ButtonLink>
              <ButtonLink href="/services/" variant="secondary">Explore our services</ButtonLink>
            </div>
            <div className="hero__note">
              <span className="hero__note-mark" aria-hidden="true">K.</span>
              <p><strong>Kurarin Solutions</strong><br />Storing Knowledge, Delivering Solutions.</p>
            </div>
          </div>
          <div className="hero-visual" aria-label="Abstract illustration of connected digital systems">
            <div className="hero-visual__orbit hero-visual__orbit--outer" />
            <div className="hero-visual__orbit hero-visual__orbit--inner" />
            <div className="hero-visual__core"><span>K</span><i /></div>
            <div className="hero-visual__card hero-visual__card--top">
              <span className="hero-visual__card-icon">↗</span>
              <span><strong>Ideas</strong><small>Start with a question</small></span>
            </div>
            <div className="hero-visual__card hero-visual__card--bottom">
              <span className="hero-visual__card-icon hero-visual__card-icon--dark">✳</span>
              <span><strong>Solutions</strong><small>Built with purpose</small></span>
            </div>
            <span className="hero-visual__dot hero-visual__dot--one" />
            <span className="hero-visual__dot hero-visual__dot--two" />
          </div>
        </Container>
        <div className="hero__bottom-line" aria-hidden="true" />
      </Section>

      <Section className="intro-section">
        <Container>
          <div className="intro-section__grid">
            <p className="eyebrow"><span /> What we believe</p>
            <div>
              <h2 className="section-title">
                Technology should make the complex feel <span>clear.</span>
              </h2>
              <p className="section-copy">
                The best solution is not simply the newest technology. It is the
                right combination of insight, craft, and dependable execution for
                the people who use it.
              </p>
              <Link className="text-link" href="/about/">Get to know us <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="services-section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> How we help</p>
              <h2 className="section-title">Practical expertise.<br /><span>Purposeful outcomes.</span></h2>
            </div>
            <p className="section-copy section-heading__copy">
              From the first idea to the systems that support it, we bring
              strategy and technology together.
            </p>
          </div>
          <div className="capability-grid">
            {capabilities.map((item) => (
              <article className="capability-card" key={item.number}>
                <span className="capability-card__number">{item.number}</span>
                <div className="capability-card__icon" aria-hidden="true">
                  {item.number === "01" ? "↗" : item.number === "02" ? "⌘" : "◎"}
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link href="/services/" aria-label={`Explore ${item.title}`} className="capability-card__link">
                  Explore <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
          <div className="services-section__bottom">
            <span>Have a challenge in mind?</span>
            <ButtonLink href="/services/" variant="secondary">View all services <span aria-hidden="true">↗</span></ButtonLink>
          </div>
        </Container>
      </Section>

      <Section className="cta-section">
        <Container>
          <div className="cta-panel">
            <div className="cta-panel__ornament" aria-hidden="true">K</div>
            <p className="eyebrow"><span /> Let&apos;s make progress</p>
            <h2>Have a challenge worth solving?</h2>
            <p>Tell us where you want to go. We&apos;ll help you explore the next step.</p>
            <ButtonLink href="/contact/">Start a conversation <span aria-hidden="true">↗</span></ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
