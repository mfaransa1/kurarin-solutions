import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageIntro } from "@/components/marketing/PageIntro";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about discussing and planning a project with Kurarin Solutions.",
  alternates: { canonical: "/faqs/" },
};

const faqs = [
  {
    question: "How do we get started?",
    answer: "Start by contacting us with a short description of your goals, the challenge you are facing, and any important deadlines or constraints. We can then discuss the appropriate next step.",
  },
  {
    question: "Which services can we discuss?",
    answer: "The current service overview covers web development, software and app development, cloud and DevOps, cybersecurity, UI/UX and product design, and data analytics. Specific scope and availability should be confirmed during the initial discussion.",
  },
  {
    question: "How much will a project cost?",
    answer: "Pricing depends on scope, complexity, dependencies, and delivery expectations. After understanding your requirements, we can discuss a suitable scope and a clear estimate. No unverified package prices are published here.",
  },
  {
    question: "How long does a project take?",
    answer: "Timelines depend on the work involved, decision-making, content or assets, integrations, and review cycles. We should agree on milestones after the scope is understood rather than promise a universal timeline.",
  },
  {
    question: "Can you work with an existing website or system?",
    answer: "That can be explored. We would first need to understand the current technology, access arrangements, condition of the system, and the outcomes you want to achieve.",
  },
  {
    question: "Will the solution work on mobile devices?",
    answer: "Responsive behavior is part of the intended design approach for public-facing web experiences. Requirements for a specific project should be agreed and tested against its target devices and users.",
  },
  {
    question: "Can you support a project after launch?",
    answer: "Ongoing maintenance or support can be discussed as part of the project scope. The availability, responsibilities, and response expectations should be documented in the agreed arrangement.",
  },
  {
    question: "What should I include in my first message?",
    answer: "A short summary of your organisation, the problem you want to solve, the people who will use the solution, your ideal timing, and any existing systems or materials is a useful starting point.",
  },
];

export default function FAQsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Helpful answers"
        title="Questions before"
        accent="we get started?"
        description="A few practical answers to help you understand the first steps. If your question is not covered, get in touch with our team."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQs" }]}
      />
      <Section className="faq-page">
        <Container>
          <div className="faq-page__layout">
            <aside className="faq-page__aside">
              <p className="eyebrow"><span /> The basics</p>
              <h2 className="section-title">Clear answers.<br /><span>Better decisions.</span></h2>
              <p className="section-copy">Every project is different. These answers explain our intended approach; exact scope, cost, and timing are confirmed for each engagement.</p>
              <ButtonLink href="/contact/">Ask us directly <span aria-hidden="true">↗</span></ButtonLink>
            </aside>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <details className="faq-item" key={faq.question}>
                  <summary>
                    <span className="faq-item__number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="faq-item__question">{faq.question}</span>
                    <span className="faq-item__toggle" aria-hidden="true" />
                  </summary>
                  <div className="faq-item__answer"><p>{faq.answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
