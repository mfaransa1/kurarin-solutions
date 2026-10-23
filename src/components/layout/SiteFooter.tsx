import Link from "next/link";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { Container } from "@/components/layout/Container";

const footerLinks = [
  { label: "About us", href: "/about/" },
  { label: "Our services", href: "/services/" },
  { label: "Our team", href: "/our-team/" },
  { label: "Insights", href: "/blog/" },
  { label: "FAQs", href: "/faqs/" },
  { label: "Contact", href: "/contact/" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <SiteLogo showTagline />
            <p className="site-footer__statement">
              Practical technology, thoughtful design, and dependable digital solutions
              for businesses ready to move forward.
            </p>
            <Link className="site-footer__email" href="/contact/">
              Tell us what you&apos;re building <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="site-footer__links-wrap">
            <div>
              <h2 className="site-footer__heading">Explore</h2>
              <ul className="site-footer__links">
                {footerLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="site-footer__heading">Get in touch</h2>
              <ul className="site-footer__links">
                <li><Link href="/contact/">Contact our team</Link></li>
                <li><a href="mailto:info@kurarinsolutions.co.ke">Email us</a></li>
                <li><span>Nairobi, Kenya</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {year} Kurarin Solutions. All rights reserved.</p>
          <p className="site-footer__tagline">Storing Knowledge, Delivering Solutions.</p>
        </div>
      </Container>
    </footer>
  );
}
