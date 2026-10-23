import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageIntro } from "@/components/marketing/PageIntro";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { services } from "@/config/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore web development, software and app development, cloud and DevOps, cybersecurity, product design, and data analytics.",
  alternates: { canonical: "/services/" },
};

const steps = [
  { number: "01", title: "Understand", text: "Clarify the problem, audience, goals, constraints, and what success should look like." },
  { number: "02", title: "Plan", text: "Agree on priorities, scope, approach, and the right sequence of work." },
  { number: "03", title: "Build", text: "Create and refine the solution with usability, quality, and maintainability in mind." },
  { number: "04", title: "Improve", text: "Review what has been delivered and identify sensible next steps as needs evolve." },
];

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="What we do"
        title="Technology services built"
        accent="around your needs."
        description="Explore practical digital and technical capabilities. We start with your challenge, then shape the work around the outcome you need."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <Section className="services-directory">
        <Container>
          <div className="services-directory__intro">
            <div>
              <p className="eyebrow"><span /> Our capabilities</p>
              <h2 className="section-title">The right tools for<br /><span>meaningful progress.</span></h2>
            </div>
            <p className="section-copy">
              Every organisation has a different starting point. Use these
              capabilities as a guide, and we can discuss which combination fits
              your goals and constraints.
            </p>
          </div>
          <div className="services-directory__grid">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </Container>
      </Section>

      <Section className="process-section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> How we work</p>
              <h2 className="section-title">Clear steps.<br /><span>Shared direction.</span></h2>
            </div>
            <p className="section-copy section-heading__copy">
              A collaborative process keeps decisions visible and helps the work
              stay connected to the original problem.
            </p>
          </div>
          <ol className="process-grid">
            {steps.map((step) => (
              <li className="process-step" key={step.number}>
                <span className="process-step__number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="services-cta">
        <Container>
          <div className="services-cta__panel">
            <div>
              <p className="eyebrow"><span /> Not sure where to begin?</p>
              <h2>Let&apos;s define the problem<br /><span>before choosing the tools.</span></h2>
              <p>Tell us what you want to improve and we can explore a sensible starting point together.</p>
            </div>
            <ButtonLink href="/contact/">Discuss your project <span aria-hidden="true">↗</span></ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
