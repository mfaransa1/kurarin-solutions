import type { MetadataRoute } from "next";

function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://kurarinsolutions.co.ke";
  try {
    return new URL(raw);
  } catch {
    return new URL("https://kurarinsolutions.co.ke");
  }
}

/**
 * Core public routes only.
 *
 * Add dynamic published blog URLs here by connecting your existing blog data
 * adapter. Do not include drafts, admin routes, query-string URLs, or redirects.
 * Keep lastModified values truthful; do not set every URL to the current time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/about/", priority: 0.7, changeFrequency: "monthly" },
    { path: "/services/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/our-team/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/faqs/", priority: 0.5, changeFrequency: "monthly" },
    { path: "/contact/", priority: 0.7, changeFrequency: "yearly" },
    { path: "/blog/", priority: 0.8, changeFrequency: "weekly" },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency,
    priority,
  }));
}
