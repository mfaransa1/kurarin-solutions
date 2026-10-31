# SEO helpers

## Environment

Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin, without a trailing path, for example:

`NEXT_PUBLIC_SITE_URL=https://kurarinsolutions.co.ke`

If the production domain is different, change the environment variable. The default is only a project assumption and must be verified before deployment.

## Use page metadata

In a route's `page.tsx`:

```tsx
import { pageMetadata } from "@/lib/seo/site";

export const metadata = pageMetadata({
  title: "About Kurarin Solutions",
  description: "Learn about Kurarin Solutions and how we help organisations solve digital challenges.",
  path: "/about/",
});
```

Use unique, accurate titles and descriptions on every indexable route. Do not copy the same metadata across all service pages.

For an admin route or private utility page:

```tsx
export const metadata = pageMetadata({
  title: "Admin",
  path: "/admin/",
  noIndex: true,
});
```

`noIndex` is not access control. Protect private pages with authentication and authorization.

## Structured data

Add `<OrganizationJsonLd />` once in the public site layout, after confirming the logo path and public site URL. Add `<ServiceJsonLd />` to an individual service detail page with accurate page-specific values.

Do not add fake ratings, reviews, prices, awards, addresses, telephone numbers, or social profile links to structured data. Add only facts displayed on the site and verified by the business.

## Dynamic blog URLs

The starter sitemap includes core public pages only. Connect the existing published-blog adapter to `src/app/sitemap.ts` so every published post has a canonical URL. Exclude drafts and unpublished posts. If that adapter is asynchronous, await it in the sitemap function.

## Images

Create the Open Graph image at `public/images/og/kurarin-default.jpg` (1200 × 630) and the logo at `public/images/brand/kurarin-logo.png`, or update the paths in code to match the real assets. These are logical placeholder paths, not included image files.
