import { siteName, siteUrl } from "@/lib/seo/site";

export function ServiceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: new URL(path, siteUrl).toString(),
    provider: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl.toString(),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
