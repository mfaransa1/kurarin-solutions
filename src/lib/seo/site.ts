import type { Metadata } from "next";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://kurarinsolutions.co.ke",
);

export const siteName = "Kurarin Solutions";

export const defaultDescription =
  "Kurarin Solutions helps organisations solve digital challenges through thoughtful technology, software, and web solutions.";

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteUrl).toString();
}

export function pageMetadata({
  title,
  description = defaultDescription,
  path = "/",
  image = "/images/og/kurarin-default.jpg",
  noIndex = false,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url: canonical,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${siteName} — ${title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
