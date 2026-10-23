export type BlogCategory = {
  name: string;
  slug: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  image: string;
  featured?: boolean;
  status: "published" | "migration-pending";
  sourceUrl?: string;
};

export const blogCategories: BlogCategory[] = [
  { name: "All insights", slug: "all" },
  { name: "Business & Technology", slug: "business-technology" },
  { name: "Web Development & Design", slug: "web-development-design" },
  { name: "IT Services", slug: "it-services" },
  { name: "Technology", slug: "technology" },
  { name: "Digital", slug: "digital" },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "why-your-business-needs-a-website",
    title: "Why Your Business Needs a Website (And How to Get One)",
    excerpt: "A practical look at why a website matters for a business and the considerations involved in creating a useful online presence.",
    category: "Business & Technology",
    date: "2025-02-13",
    readMinutes: 5,
    image: "/images/blog/business-website.jpg",
    featured: true,
    status: "migration-pending",
    sourceUrl: "https://kurarinsolutions.co.ke/why-your-business-needs-a-website/",
  },
  {
    slug: "the-it-evolution-advancing-next-generation-solutions-pro",
    title: "The IT Evolution: Advancing Next-Generation Solutions Pro",
    excerpt: "An existing article title from the live blog archive. The original article body should be migrated and reviewed before publication.",
    category: "IT Services",
    date: "2024-09-07",
    readMinutes: 6,
    image: "/images/blog/it-evolution.jpg",
    status: "migration-pending",
    sourceUrl: "https://kurarinsolutions.co.ke/",
  },
  {
    slug: "the-tech-atlas-is-mapping-the-landscape-of-it-solutions",
    title: "The Tech Atlas Is Mapping the Landscape of IT Solutions",
    excerpt: "An existing technology article from the live archive. Its original body and metadata remain to be migrated.",
    category: "Technology",
    date: "2024-09-07",
    readMinutes: 6,
    image: "/images/blog/tech-atlas.jpg",
    status: "migration-pending",
    sourceUrl: "https://kurarinsolutions.co.ke/",
  },
  {
    slug: "unlocking-tech-potential-is-ways-to-effective-it-solutions",
    title: "Unlocking Tech Potential Is Ways To Effective IT Solutions",
    excerpt: "A legacy article title retained as a migration reference until the original content is imported and editorially reviewed.",
    category: "Technology",
    date: "2024-09-07",
    readMinutes: 5,
    image: "/images/blog/tech-potential.jpg",
    status: "migration-pending",
    sourceUrl: "https://kurarinsolutions.co.ke/",
  },
  {
    slug: "beyond-the-binary-is-cutting-edge-it-solutions-unveiled-tech",
    title: "Beyond the Binary Is Cutting-Edge IT Solutions Unveiled Tech",
    excerpt: "A legacy technology article retained in the inventory for later content migration.",
    category: "Technology",
    date: "2024-09-07",
    readMinutes: 5,
    image: "/images/blog/beyond-binary.jpg",
    status: "migration-pending",
    sourceUrl: "https://kurarinsolutions.co.ke/",
  },
  {
    slug: "beyond-boundaries-is-charting-new-territories-in-it-solutions",
    title: "Beyond Boundaries Is Charting New Territories in IT Solutions",
    excerpt: "A legacy IT services article listed on the current blog archive; its full source content is not included in this starter dataset.",
    category: "IT Services",
    date: "2024-09-07",
    readMinutes: 5,
    image: "/images/blog/beyond-boundaries.jpg",
    status: "migration-pending",
    sourceUrl: "https://kurarinsolutions.co.ke/",
  },
  {
    slug: "digital-discourses-is-conversion-on-innovative-it-solutions",
    title: "Digital Discourses Is Conversion on Innovative IT Solutions",
    excerpt: "A legacy article title from the live archive, awaiting content and URL verification during migration.",
    category: "IT Services",
    date: "2024-09-07",
    readMinutes: 5,
    image: "/images/blog/digital-discourses.jpg",
    status: "migration-pending",
    sourceUrl: "https://kurarinsolutions.co.ke/",
  },
  {
    slug: "how-to-choose-the-right-customer-for-your-photo-business",
    title: "How to Choose the Right Customer for Your Photo Business",
    excerpt: "A legacy article listed under a digital-related category. The original content should be imported before this page is published.",
    category: "Digital",
    date: "2024-09-07",
    readMinutes: 5,
    image: "/images/blog/photo-business.jpg",
    status: "migration-pending",
    sourceUrl: "https://kurarinsolutions.co.ke/",
  },
  {
    slug: "how-to-optimize-images-in-wordpress-for-faster-loading",
    title: "How to Optimize Images in WP for Faster Loading Guide",
    excerpt: "A practical topic around image optimization and page performance. Full source copy is pending migration.",
    category: "Web Development & Design",
    date: "2024-09-07",
    readMinutes: 5,
    image: "/images/blog/wordpress-images.jpg",
    status: "migration-pending",
    sourceUrl: "https://kurarinsolutions.co.ke/",
  },
  {
    slug: "where-to-grow-your-business-as-a-site-or-social-media",
    title: "Where to Grow Your Business as a Site or Social Media?",
    excerpt: "A legacy business article listed on the current blog archive; the original text and canonical URL need to be verified.",
    category: "Business & Technology",
    date: "2024-09-07",
    readMinutes: 5,
    image: "/images/blog/business-online.jpg",
    status: "migration-pending",
    sourceUrl: "https://kurarinsolutions.co.ke/",
  },
  {
    slug: "the-future-of-artificial-intelligence-in-kenyan-businesses",
    title: "The Future of Artificial Intelligence (AI) in Kenyan Businesses",
    excerpt: "Explore how AI may support automation, customer service, and decision-making for Kenyan businesses.",
    category: "Technology",
    date: "2023-12-30",
    readMinutes: 7,
    image: "/images/blog/ai-kenyan-business.jpg",
    status: "migration-pending",
    sourceUrl: "https://kurarinsolutions.co.ke/our-blog/",
  },
  {
    slug: "building-a-strong-online-presence-for-kenyan-businesses",
    title: "Building a Strong Online Presence: Essential Web Design Tips for Kenyan Businesses",
    excerpt: "An existing article about websites as an online storefront and practical ways to improve a business's online presence.",
    category: "Web Development & Design",
    date: "2023-12-30",
    readMinutes: 7,
    image: "/images/blog/online-presence.jpg",
    status: "migration-pending",
    sourceUrl: "https://kurarinsolutions.co.ke/our-blog/",
  },
  {
    slug: "printing-services-for-modern-businesses-in-kenya",
    title: "Printing Services for Modern Businesses: Bridging the Digital and Physical Worlds in Kenya",
    excerpt: "A legacy article discussing how print services can complement digital tools in modern business operations.",
    category: "Business & Technology",
    date: "2023-12-30",
    readMinutes: 6,
    image: "/images/blog/printing-services.jpg",
    status: "migration-pending",
    sourceUrl: "https://kurarinsolutions.co.ke/our-blog/",
  },
  {
    slug: "building-a-mobile-app-for-your-business",
    title: "Building a Mobile App for Your Business: Key Considerations and Benefits",
    excerpt: "An overview of platform choice, user experience, security, integrations, and potential benefits of a business mobile app.",
    category: "Technology",
    date: "2023-12-30",
    readMinutes: 7,
    image: "/images/blog/mobile-app-business.jpg",
    status: "migration-pending",
    sourceUrl: "https://kurarinsolutions.co.ke/our-blog/",
  },
  {
    slug: "importance-of-regular-software-maintenance-and-updates",
    title: "Understanding the Importance of Regular Software Maintenance and Updates",
    excerpt: "A legacy article on why software needs continued maintenance as systems, dependencies, and security risks change.",
    category: "IT Services",
    date: "2023-12-30",
    readMinutes: 6,
    image: "/images/blog/software-maintenance.jpg",
    status: "migration-pending",
    sourceUrl: "https://kurarinsolutions.co.ke/our-blog/",
  },
  {
    slug: "role-of-technology-in-supporting-kenya-sme-growth",
    title: "The Role of Technology in Supporting Kenya's SME Growth",
    excerpt: "An existing article about how digital tools, mobile payments, cloud computing, and e-commerce can support small and medium enterprises.",
    category: "Business & Technology",
    date: "2023-12-30",
    readMinutes: 7,
    image: "/images/blog/kenya-sme-growth.jpg",
    status: "migration-pending",
    sourceUrl: "https://kurarinsolutions.co.ke/our-blog/",
  },
  {
    slug: "cybersecurity-in-kenya-protecting-your-business",
    title: "Cybersecurity in Kenya: Protecting Your Business in the Digital Age",
    excerpt: "A legacy article about cyber risks and the importance of protecting business systems and information.",
    category: "Technology",
    date: "2023-12-30",
    readMinutes: 6,
    image: "/images/blog/cybersecurity-kenya.jpg",
    status: "migration-pending",
    sourceUrl: "https://kurarinsolutions.co.ke/our-blog/",
  },
  {
    slug: "how-data-analytics-can-drive-growth-for-kenyan-businesses",
    title: "How Data Analytics Can Drive Growth for Kenyan Businesses",
    excerpt: "An article about using customer insights, operational measures, and business data to make better-informed decisions.",
    category: "Business & Technology",
    date: "2025-02-17",
    readMinutes: 7,
    image: "/images/blog/data-analytics-kenya.jpg",
    status: "migration-pending",
    sourceUrl: "https://kurarinsolutions.co.ke/2025/02/17/data-analytics-kenya/",
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

export function slugifyCategory(category: string) {
  return category.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
