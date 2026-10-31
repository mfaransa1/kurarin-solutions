"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./header-redesign.css";

type NavItem = { label: string; href: string };
type NavGroup = { label: string; items: NavItem[] };

const groups: NavGroup[] = [
  {
    label: "Services",
    items: [
      { label: "All services", href: "/services/" },
      { label: "Software Development", href: "/services/software-development/" },
      { label: "Business Automation", href: "/services/business-automation/" },
      { label: "Cloud & Infrastructure", href: "/services/cloud-infrastructure/" },
      { label: "Digital Products", href: "/services/digital-products/" },
    ],
  },
  {
    label: "How we work",
    items: [
      { label: "Our approach", href: "/solutions/" },
      { label: "Solutions", href: "/solutions/" },
      { label: "Our work", href: "/work/" },
      { label: "Careers", href: "/careers/" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Blog", href: "/blog/" },
      { label: "FAQs", href: "/faqs/" },
      { label: "Our team", href: "/our-team/" },
    ],
  },
];

function isCurrent(pathname: string, href: string) {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const normalizedHref = href.replace(/\/+$/, "") || "/";
  return normalizedPath === normalizedHref ||
    (normalizedHref !== "/" && normalizedPath.startsWith(`${normalizedHref}/`));
}

export function SiteHeader() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenGroup(null);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <header className="kr-header">
      <nav className="kr-header__inner" aria-label="Main navigation" ref={navRef}>
        <Link className="kr-brand" href="/" aria-label="Kurarin Solutions home">
          <span className="kr-brand__mark" aria-hidden="true">
            <img src="/images/kurarin-icon.png" alt="" width={34} height={34} />
          </span>
          <span className="kr-brand__name">Kurarin<span> Solutions</span></span>
        </Link>

        <div className="kr-nav__desktop">
          {groups.map((group) => {
            const active = group.items.some((item) => isCurrent(pathname, item.href));
            const expanded = openGroup === group.label;
            return (
              <div className={`kr-nav-group${expanded ? " is-open" : ""}`} key={group.label}>
                <button
                  className={`kr-nav-trigger${active ? " is-active" : ""}`}
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpenGroup(expanded ? null : group.label)}
                >
                  {group.label}
                  <svg viewBox="0 0 16 16" aria-hidden="true" className="kr-chevron">
                    <path d="m3.5 6 4.5 4 4.5-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {expanded && (
                  <div className="kr-dropdown">
                    {group.items.map((item) => (
                      <Link
                        className={`kr-dropdown__link${isCurrent(pathname, item.href) ? " is-current" : ""}`}
                        href={item.href}
                        key={`${group.label}-${item.label}`}
                        onClick={() => setOpenGroup(null)}
                      >
                        <span>{item.label}</span>
                        <span className="kr-dropdown__arrow" aria-hidden="true">↗</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <Link className={`kr-nav-link${isCurrent(pathname, "/about/") ? " is-active" : ""}`} href="/about/">About</Link>
        </div>

        <Link className="kr-header__cta" href="/contact/">
          Talk to us <span aria-hidden="true">→</span>
        </Link>

        <button
          className={`kr-mobile-toggle${mobileOpen ? " is-open" : ""}`}
          type="button"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="kr-mobile-menu"
          onClick={() => setMobileOpen((value) => !value)}
        >
          <span /><span />
        </button>

        {mobileOpen && (
          <div className="kr-mobile-menu" id="kr-mobile-menu">
            {groups.map((group) => (
              <div className="kr-mobile-group" key={`mobile-${group.label}`}>
                <p>{group.label}</p>
                {group.items.map((item) => (
                  <Link href={item.href} key={`mobile-${item.label}`} onClick={() => setMobileOpen(false)}>
                    {item.label}<span aria-hidden="true">↗</span>
                  </Link>
                ))}
              </div>
            ))}
            <Link className="kr-mobile-menu__single" href="/about/" onClick={() => setMobileOpen(false)}>About</Link>
            <Link className="kr-mobile-menu__single" href="/our-team/" onClick={() => setMobileOpen(false)}>Our team</Link>
            <Link className="kr-mobile-menu__cta" href="/contact/" onClick={() => setMobileOpen(false)}>Talk to us <span aria-hidden="true">→</span></Link>
          </div>
        )}
      </nav>
    </header>
  );
}
