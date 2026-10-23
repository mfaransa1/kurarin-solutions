import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageIntro } from "@/components/marketing/PageIntro";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the people behind Kurarin Solutions and learn how we approach collaboration.",
  alternates: { canonical: "/our-team/" },
};

const team = [
  { name: "Team profile coming soon", role: "Kurarin Solutions", description: "We are preparing verified team biographies and portraits for this page." },
];

export default function TeamPage() {
  return (
    <>
      <PageIntro
        eyebrow="People behind the work"
        title="Good work starts with"
        accent="good people."
        description="Thoughtful collaboration, clear communication, and respect for the people who use what we build."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our team" }]}
      />
      <Section className="team-page">
        <Container>
          <div className="team-page__intro">
            <p className="eyebrow"><span /> A people-first approach</p>
            <h2 className="section-title">The people matter<br /><span>as much as the product.</span></h2>
            <p className="section-copy">
              We believe strong outcomes come from asking useful questions, sharing context,
              and working together. Verified team profiles will be published here once names,
              roles, biographies, and approved portraits have been confirmed.
            </p>
          </div>
          <div className="team-placeholder-grid">
            {team.map((member) => (
              <article className="team-placeholder" key={member.name}>
                <div className="team-placeholder__portrait" aria-hidden="true">K<span>.</span></div>
                <p className="eyebrow"><span /> Profile pending</p>
                <h3>{member.name}</h3>
                <p className="team-placeholder__role">{member.role}</p>
                <p>{member.description}</p>
              </article>
            ))}
          </div>
          <div className="team-page__cta">
            <div>
              <h2>Interested in working together?</h2>
              <p>Tell us what you are planning and we can start a conversation.</p>
            </div>
            <ButtonLink href="/contact/">Contact us <span aria-hidden="true">↗</span></ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
