import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageIntro } from "@/components/marketing/PageIntro";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { getPublicBlogPosts } from "@/lib/blog/public-posts";

export const metadata: Metadata = {
  title: "Blog & Insights",
  description: "Ideas, explainers, and practical perspectives on technology, digital experiences, and business in Kenya.",
  alternates: { canonical: "/blog/" },
};

export default async function BlogPage() {
  const blogPosts = await getPublicBlogPosts();
  const featured = blogPosts.find((post) => post.featured) ?? blogPosts[0];
  const latest = blogPosts.filter((post) => post.slug !== featured?.slug).slice(0, 2);

  return (
    <>
      <PageIntro
        eyebrow="Kurarin insights"
        title="Ideas for a more"
        accent="thoughtful digital future."
        description="Explore perspectives on websites, software, technology, and the practical decisions that help businesses move forward."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <Section className="blog-featured-section">
        <Container>
          {featured ? (
            <>
              <div className="blog-section-heading">
                <div>
                  <p className="eyebrow"><span /> Editor&apos;s pick</p>
                  <h2 className="section-title">Start with a useful<br /><span>perspective.</span></h2>
                </div>
                <p className="section-copy">Practical reading for people making decisions about their business and technology.</p>
              </div>
              <div className="blog-featured-grid">
                <BlogCard post={featured} featured />
                <div className="blog-latest-stack">
                  {latest.map((post) => <BlogCard post={post} key={post.slug} />)}
                  <div className="blog-subscribe-note">
                    <span className="blog-subscribe-note__mark" aria-hidden="true">K<span>.</span></span>
                    <div><strong>Knowledge worth keeping.</strong><p>Browse the archive for more ideas and practical guidance.</p></div>
                    <Link href="#all-articles" aria-label="Browse all articles">↘</Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="blog-empty blog-empty--server">
              <h2>New insights are on the way.</h2>
              <p>There are no published articles available yet. Check back soon.</p>
            </div>
          )}
        </Container>
      </Section>

      <Section className="blog-archive-section">
        <Container>
          <div className="blog-section-heading blog-section-heading--archive" id="all-articles">
            <div>
              <p className="eyebrow"><span /> The archive</p>
              <h2 className="section-title">Explore all <span>insights.</span></h2>
            </div>
            <p className="section-copy">Search the available archive by keyword or category. New articles published through the Kurarin CMS appear here automatically.</p>
          </div>
          <BlogSearch posts={blogPosts} />
        </Container>
      </Section>
    </>
  );
}
