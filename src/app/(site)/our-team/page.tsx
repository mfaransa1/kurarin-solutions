import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageIntro } from "@/components/marketing/PageIntro";
import { ButtonLink } from "@/components/ui/ButtonLink";
import "./team-page.css";

export const metadata: Metadata = {
  title: "Our Team | Kurarin Solutions",
  description:
    "Meet the people guiding Kurarin Solutions across company leadership, product strategy, technology, and backend engineering.",
  alternates: { canonical: "/our-team/" },
};

const team = [
  {
    name: "Pardon Freezer",
    role: "Founder & CEO",
    initials: "PF",
    bio: "Pardon leads Kurarin Solutions’ vision and business direction, bringing the team together around practical technology that helps organizations move forward.",
    focus: "Vision & strategy",
  },
  {
    name: "Juliana",
    role: "Head of Product",
    initials: "J",
    bio: "Juliana guides product direction from early discovery through delivery, helping turn user needs and business goals into clear, useful digital experiences.",
    focus: "Product & experience",
  },
  {
    name: "Kelvin",
    role: "Chief Technology Officer",
    initials: "K",
    bio: "Kelvin leads the technical direction of our work, shaping the architecture and engineering decisions that help our solutions remain dependable and adaptable.",
    focus: "Technology & architecture",
  },
  {
    name: "Michael",
    role: "Backend Engineer",
    initials: "M",
    bio: "Michael builds the server-side foundations behind our digital products, working on application logic, data flows, and the systems that keep features working together.",
    focus: "Backend systems",
  },
];

export default function TeamPage() {
  return (
    <>
      <PageIntro
        eyebrow="People behind the work"
        title="Meet the people building"
        accent="what comes next."
        description="A focused team bringing business understanding, product thinking, and engineering together to deliver useful digital solutions."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Our team" }]}
      />
      <Section className="team-page team-page--updated">
        <Container>
          <div className="team-page__intro">
            <p className="eyebrow"><span /> A team built around solutions</p>
            <h2 className="section-title">Different strengths.<br /><span>One shared direction.</span></h2>
            <p className="section-copy">
              Our work brings together leadership, product design decisions, and software engineering.
              We collaborate closely to understand the problem first and build with purpose.
            </p>
          </div>

          <div className="team-profile-grid">
            {team.map((member, index) => (
              <article className="team-profile" key={member.name}>
                <div className={`team-profile__portrait team-profile__portrait--${index + 1}`} aria-label={`${member.name} profile placeholder`}>
                  <span className="team-profile__initials">{member.initials}</span>
                  <span className="team-profile__index">0{index + 1}</span>
                </div>
                <div className="team-profile__body">
                  <p className="team-profile__focus">{member.focus}</p>
                  <h3>{member.name}</h3>
                  <p className="team-profile__role">{member.role}</p>
                  <p className="team-profile__bio">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="team-page__cta">
            <div>
              <h2>Have a challenge in mind?</h2>
              <p>Let’s bring the right people together and talk through what you need.</p>
            </div>
            <ButtonLink href="/contact/">Talk to us <span aria-hidden="true">↗</span></ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
