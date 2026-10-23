import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageIntro } from "@/components/marketing/PageIntro";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Kurarin Solutions to discuss a project, service requirement, or technology challenge.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact Kurarin"
        title="Tell us what you"
        accent="want to solve."
        description="Share a little about your goals and we can work out a practical next step together."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <Section className="contact-page">
        <Container>
          <div className="contact-page__grid">
            <div className="contact-page__details">
              <p className="eyebrow"><span /> Start a conversation</p>
              <h2 className="section-title">Every good solution<br /><span>starts somewhere.</span></h2>
              <p className="section-copy">Use the form to outline your project or question. Please do not include passwords, confidential credentials, or sensitive personal information.</p>
              <div className="contact-detail">
                <span className="contact-detail__icon" aria-hidden="true">@</span>
                <div><span>Email</span><a href="mailto:info@kurarinsolutions.co.ke">info@kurarinsolutions.co.ke</a></div>
              </div>
              <div className="contact-detail">
                <span className="contact-detail__icon" aria-hidden="true">⌖</span>
                <div><span>Location</span><p>Nairobi, Kenya</p></div>
              </div>
              <p className="contact-page__note">Contact details are based on publicly surfaced company information and should be verified before production launch.</p>
            </div>
            <div className="contact-form-panel">
              <h2>Project enquiry</h2>
              <p>Fields marked with an asterisk are required.</p>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
