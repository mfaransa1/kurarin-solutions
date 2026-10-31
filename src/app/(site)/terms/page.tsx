import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing access to and use of the Kurarin Solutions website.",
  alternates: { canonical: "/terms/" },
};

const updated = "23 October 2026";

export default function TermsPage() {
  return (
    <article className="legal-page">
      <header className="legal-page__hero">
        <p className="legal-page__eyebrow">LEGAL · WEBSITE TERMS</p>
        <h1>Terms of <span>Use.</span></h1>
        <p className="legal-page__lead">
          These terms describe the basic conditions for accessing and using the Kurarin
          Solutions website.
        </p>
        <p className="legal-page__updated">Last updated: {updated}</p>
      </header>

      <div className="legal-page__body">
        <section>
          <h2>1. About these terms</h2>
          <p>
            In these terms, “Kurarin Solutions”, “we”, “us” and “our” refer to the business
            operating this website. By accessing or using the website, you agree to these
            terms. If you do not agree, please stop using the website.
          </p>
        </section>
        <section>
          <h2>2. Website information</h2>
          <p>
            The website provides general information about our company, capabilities,
            services and related resources. Website content is provided for general
            informational purposes and may be updated, changed or removed without notice.
            Contact us to discuss your specific requirements before relying on information
            as a commitment or project specification.
          </p>
        </section>
        <section>
          <h2>3. No automatic service agreement</h2>
          <p>
            Browsing the website or submitting an enquiry does not, by itself, create a
            client relationship or require us to accept a project. Any paid work, deliverables,
            timelines, fees, support obligations, intellectual-property arrangements and
            other project terms must be agreed separately in a written proposal, statement
            of work, contract or other applicable agreement.
          </p>
        </section>
        <section>
          <h2>4. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the website unlawfully or to violate another person’s rights.</li>
            <li>Attempt to gain unauthorised access to the website, accounts, systems or data.</li>
            <li>Interfere with website operation, security or availability.</li>
            <li>Upload or transmit malicious code, spam or misleading material.</li>
            <li>Scrape, copy or reuse website content in a way that infringes applicable rights or law.</li>
          </ul>
        </section>
        <section>
          <h2>5. Intellectual property</h2>
          <p>
            Unless otherwise stated, website text, branding, graphics, design and other
            materials are owned by or licensed to the website operator and are protected by
            applicable intellectual-property laws. You may view and share links to public
            pages for lawful, non-misleading purposes. You may not reproduce, modify,
            distribute or commercially exploit protected material without permission,
            except where the law allows it.
          </p>
          <p>
            Third-party names, marks and materials remain the property of their respective owners.
          </p>
        </section>
        <section>
          <h2>6. Enquiries and submissions</h2>
          <p>
            If you send us an enquiry, you confirm that the information you provide is
            accurate to the best of your knowledge and that you are entitled to share it.
            Do not submit confidential or sensitive material unless it is necessary and an
            appropriate arrangement or secure channel is in place.
          </p>
        </section>
        <section>
          <h2>7. Third-party services and links</h2>
          <p>
            The website may link to third-party websites or use third-party services. We do
            not control all third-party content, availability or terms. Your use of those
            services may be subject to their own terms and policies.
          </p>
        </section>
        <section>
          <h2>8. Availability and disclaimers</h2>
          <p>
            We aim to keep the website available and information useful, but do not guarantee
            uninterrupted access, that every page will always be error-free, or that all
            content will be complete or current. To the extent permitted by law, the website
            is provided on an “as is” and “as available” basis.
          </p>
        </section>
        <section>
          <h2>9. Limitation of liability</h2>
          <p>
            To the extent permitted by applicable law, we are not liable for indirect,
            incidental, special or consequential loss arising from or related to use of,
            or inability to use, this website. Nothing in these terms excludes or limits
            liability that cannot lawfully be excluded or limited.
          </p>
        </section>
        <section>
          <h2>10. Privacy</h2>
          <p>
            Our handling of personal information is described in our <Link href="/privacy-policy/">Privacy Policy</Link>.
            Please read it alongside these terms.
          </p>
        </section>
        <section>
          <h2>11. Changes to these terms</h2>
          <p>
            We may update these terms when the website or our requirements change. The
            “Last updated” date indicates when the current version was prepared. Continued
            use of the website after an update means you use it subject to the updated terms,
            to the extent permitted by law.
          </p>
        </section>
        <section>
          <h2>12. Governing law</h2>
          <p>
            These terms are intended to operate subject to the laws applicable to the
            website operator and the user. The responsible legal entity and governing-law
            details should be confirmed before publication so this section can accurately
            state the applicable jurisdiction and dispute process.
          </p>
        </section>
        <section>
          <h2>13. Contact</h2>
          <p>
            If you have a question about these terms, please use our <Link href="/contact/">contact page</Link>.
          </p>
        </section>
        <p className="legal-page__notice">
          In case you feel something is missing or needs updated or you just need a clarification, don't hesitate to contact us. Our contact details are 
          available on our contact page.
        </p>
      </div>
    </article>
  );
}
