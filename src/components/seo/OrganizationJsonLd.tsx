import { siteName, siteUrl } from "@/lib/seo/site";

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl.toString(),
    logo: new URL("/images/brand/kurarin-logo.png", siteUrl).toString(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
