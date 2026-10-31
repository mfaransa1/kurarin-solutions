'use client';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const footerGroups = [
  {
    title: "Services",
    links: [
      { label: "Software Development", href: "/services/software-development/" },
      { label: "Business Automation", href: "/services/business-automation/" },
      { label: "Cloud & Infrastructure", href: "/services/cloud-infrastructure/" },
      { label: "Digital Products", href: "/services/digital-products/" },
    ],
  },
  {
    title: "How we work",
    links: [
      { label: "Our approach", href: "/about/#our-approach" },
      { label: "Our work", href: "/work/" },
      { label: "Solutions", href: "/solutions/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog/" },
      { label: "FAQs", href: "/faqs/" },
      { label: "Careers", href: "/careers/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about/" },
      { label: "Our team", href: "/our-team/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
];

export function SiteFooter() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="site-footer site-footer--editorial">
      <div className="site-footer__editorial-inner">
        <div className="site-footer__editorial-main">
          <div className="site-footer__brand-column">
            <Link href="/" className="site-footer__brand" aria-label="Kurarin Solutions home">
              <Image
                src="/images/kurarin-icon.png"
                alt=""
                width={30}
                height={30}
                className="site-footer__brand-icon"
              />
              <span>Kurarin Solutions</span>
            </Link>
            <p className="site-footer__company-line">Software · Systems · Automation · Cloud</p>
            <p className="site-footer__brand-copy">
              We build custom software, business systems and digital experiences that help
              organisations work better and grow with confidence.
            </p>
          </div>

          {footerGroups.map((group) => (
            <nav key={group.title} className="site-footer__group" aria-label={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="site-footer__editorial-bottom">
          <div className="site-footer__bottom-links">
            <Link href="/contact/">Contact us</Link>
            <Link href="/privacy-policy/">Privacy</Link>
            <Link href="/terms/">Terms</Link>
          </div>
          <p>© {year} Kurarin Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
