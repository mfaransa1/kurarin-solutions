import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageIntro } from "@/components/marketing/PageIntro";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the principles behind Kurarin Solutions and our approach to practical, thoughtful technology.",
  alternates: { canonical: "/about/" },
};

const principles = [
  {
    number: "01",
    title: "Understand before building",
    description:
      "We begin by clarifying the people, goals, constraints, and problems a solution needs to serve.",
  },
  {
    number: "02",
    title: "Make complexity useful",
    description:
      "We aim to turn complicated requirements into clear experiences, understandable choices, and maintainable systems.",
  },
  {
    number: "03",
    title: "Build for real use",
    description:
      "A solution should work for the people who depend on it, across devices, abilities, and everyday situations.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About Kurarin"
        title="Good technology starts with"
        accent="understanding."
        description="We believe useful digital solutions come from listening carefully, thinking clearly, and building with purpose."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About us" }]}
      />

      <Section className="about-story">
        <Container>
          <div className="about-story__grid">
            <div className="about-story__label">
              <p className="eyebrow"><span /> Our approach</p>
              <span className="about-story__monogram" aria-hidden="true">K<span>.</span></span>
            </div>
            <div className="about-story__content">
              <h2 className="section-title">
                Technology is the tool.<br />
                <span>Progress is the point.</span>
              </h2>
              <p>
                Kurarin Solutions is built around a simple idea: technology
                should solve meaningful problems. Whether the need is a website,
                a software product, or a stronger technical foundation, the work
                should begin with the people and purpose behind it.
              </p>
              <p>
                Our approach brings practical thinking and thoughtful execution
                together. We aim to make decisions understandable, experiences
                easier to use, and solutions easier to maintain.
              </p>
              <ButtonLink href="/services/">Explore what we do <span aria-hidden="true">↗</span></ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="principles-section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> What guides us</p>
              <h2 className="section-title">A thoughtful way<br /><span>to solve problems.</span></h2>
            </div>
            <p className="section-copy section-heading__copy">
              Good outcomes are rarely accidental. They come from clear priorities,
              considered decisions, and attention to the details that matter.
            </p>
          </div>
          <div className="principles-grid">
            {principles.map((principle) => (
              <article className="principle-card" key={principle.number}>
                <span>{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="about-cta">
        <Container>
          <div className="about-cta__inner">
            <div>
              <p className="eyebrow"><span /> Start a conversation</p>
              <h2>Let&apos;s work out<br /><span>what comes next.</span></h2>
            </div>
            <div className="about-cta__action">
              <p>Share the challenge you are trying to solve. We can start with the problem and explore the right next step.</p>
              <ButtonLink href="/contact/">Talk to our team <span aria-hidden="true">↗</span></ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
