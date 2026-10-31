import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Kurarin Solutions handles personal information submitted through this website.",
  alternates: { canonical: "/privacy-policy/" },
};

const updated = "23 October 2026";

export default function PrivacyPolicyPage() {
  return (
    <article className="legal-page">
      <header className="legal-page__hero">
        <p className="legal-page__eyebrow">LEGAL · PRIVACY</p>
        <h1>Privacy <span>Policy.</span></h1>
        <p className="legal-page__lead">
          This policy explains how Kurarin Solutions handles information you choose to share
          with us when you use this website or contact our team.
        </p>
        <p className="legal-page__updated">Last updated: {updated}</p>
      </header>

      <div className="legal-page__body">
        <section>
          <h2>1. Who we are</h2>
          <p>
            “Kurarin Solutions”, “we”, “us” and “our” refer to the business operating this
            website. If you have a question about this policy or how your information is
            handled, please <Link href="/contact/">contact us</Link>.
          </p>
        </section>
        <section>
          <h2>2. Information you provide</h2>
          <p>Depending on how you interact with us, you may choose to provide information such as:</p>
          <ul>
            <li>Your name and contact details, including email address or phone number.</li>
            <li>Details about your organisation, project, budget or service enquiry.</li>
            <li>Information included in messages, files or other material you send to us.</li>
            <li>Information you provide when applying for a role or otherwise contacting us.</li>
          </ul>
          <p>Please do not send passwords, payment-card details or other sensitive information through general website forms.</p>
        </section>
        <section>
          <h2>3. Information collected through use</h2>
          <p>
            When you visit a website, technical information may be processed by the website
            platform or hosting provider, such as your IP address, browser type, device
            information, pages requested and timestamps. Cookies or similar technologies may
            also be used where enabled by the website configuration or third-party services.
          </p>
          <p>
            The exact information collected depends on the tools and settings active on this
            website. We will update this policy if our use of analytics, advertising or other
            tracking tools materially changes.
          </p>
        </section>
        <section>
          <h2>4. How we use information</h2>
          <p>We may use information you provide to:</p>
          <ul>
            <li>Respond to enquiries and communicate with you.</li>
            <li>Understand project requirements and prepare proposals.</li>
            <li>Deliver, support and improve our services where you engage us.</li>
            <li>Maintain website security, prevent misuse and troubleshoot technical issues.</li>
            <li>Meet applicable legal obligations and establish or defend legal claims.</li>
          </ul>
        </section>
        <section>
          <h2>5. Legal grounds and consent</h2>
          <p>
            Where applicable data-protection law requires a lawful basis, we will rely on a
            basis appropriate to the circumstances, which may include responding to your
            request, performing or preparing a contract, complying with a legal obligation,
            pursuing legitimate interests, or obtaining your consent where required.
          </p>
        </section>
        <section>
          <h2>6. Sharing information</h2>
          <p>
            We do not publish your enquiry details. We may share information with service
            providers who help operate the website or support our business, where necessary
            and subject to appropriate safeguards. We may also disclose information when
            required by law or when reasonably necessary to protect rights, safety and
            security. We do not sell personal information as a business model.
          </p>
        </section>
        <section>
          <h2>7. Storage and security</h2>
          <p>
            We use reasonable administrative and technical measures intended to protect
            information. No website, transmission method or storage system can be guaranteed
            to be completely secure. Information may be processed or stored in countries
            other than your own, depending on the providers used to operate our services.
          </p>
        </section>
        <section>
          <h2>8. Retention</h2>
          <p>
            We keep personal information only for as long as reasonably necessary for the
            purpose for which it was collected, including responding to you, maintaining
            business records, resolving disputes and meeting legal requirements.
          </p>
        </section>
        <section>
          <h2>9. Your choices and rights</h2>
          <p>
            Depending on applicable law, you may have rights to request access to, correction
            of, deletion of or restriction of certain personal information, to object to
            certain processing, or to withdraw consent where processing relies on consent.
            You may also have the right to complain to the relevant data-protection authority.
            We may need to verify your identity before acting on a request.
          </p>
        </section>
        <section>
          <h2>10. Third-party websites</h2>
          <p>
            This website may link to third-party websites or services. Their privacy practices
            are governed by their own policies, and we are not responsible for their content
            or practices. Please review those policies before providing information.
          </p>
        </section>
        <section>
          <h2>11. Children</h2>
          <p>
            This website is intended for a general business audience and is not designed to
            solicit personal information from children. If you believe a child has provided
            us personal information, please contact us so we can review the matter.
          </p>
        </section>
        <section>
          <h2>12. Changes to this policy</h2>
          <p>
            We may revise this policy as our services, website or legal obligations change.
            The “Last updated” date at the top indicates when the current version was prepared.
          </p>
        </section>
        <section>
          <h2>13. Contact</h2>
          <p>
            For privacy questions or requests, use our <Link href="/contact/">contact page</Link>.
            Please include enough detail for us to understand your request, but do not include
            sensitive information unless it is necessary and you have an appropriate secure channel.
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
