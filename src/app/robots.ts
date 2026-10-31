import type { MetadataRoute } from "next";

function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://kurarinsolutions.co.ke";
  try {
    return new URL(raw);
  } catch {
    return new URL("https://kurarinsolutions.co.ke");
  }
}

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
    host: siteUrl.host,
  };
}
