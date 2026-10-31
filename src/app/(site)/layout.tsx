import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./site.css";
import "./pages.css";
import "./content-pages.css";
import "./blog.css";
/* Keep the footer styles last so they override older shared footer rules. */
import "./footer-redesign.css";
import "./legal-pages.css";

export const metadata: Metadata = {
  title: {
    default: "Kurarin Solutions | Storing Knowledge, Delivering Solutions",
    template: "%s | Kurarin Solutions",
  },
  description:
    "Kurarin Solutions helps organisations move forward with thoughtful digital and technology solutions.",
};

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </>
  );
}
