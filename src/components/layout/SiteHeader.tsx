"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteLogo } from "@/components/layout/SiteLogo";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Our Team", href: "/our-team/" },
  { label: "Insights", href: "/blog/" },
  { label: "FAQs", href: "/faqs/" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container-site site-header__inner">
        <SiteLogo priority />

        <nav className="site-header__desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`site-header__nav-link${active ? " is-active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link className="button button--primary site-header__desktop-cta" href="/contact/">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </Link>

        <button
          type="button"
          className="site-header__menu-toggle"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`menu-icon${menuOpen ? " is-open" : ""}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div className={`site-header__mobile-panel${menuOpen ? " is-open" : ""}`}>
        <nav id="mobile-navigation" className="site-header__mobile-nav" aria-label="Mobile navigation">
          {navigation.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`site-header__mobile-link${active ? " is-active" : ""}`}
              >
                {item.label}
                <span aria-hidden="true">↗</span>
              </Link>
            );
          })}
          <Link className="button button--primary site-header__mobile-cta" href="/contact/">
            Start a conversation <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
      {menuOpen ? (
        <button
          type="button"
          aria-label="Close navigation menu overlay"
          className="site-header__backdrop"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
    </header>
  );
}
