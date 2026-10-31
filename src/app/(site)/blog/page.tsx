import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSearch } from "@/components/blog/BlogSearch";
import { getPublicBlogPosts } from "@/lib/blog/public-posts";
import "./editorial-refresh.css";

export const metadata: Metadata = {
  title: "Blog & Insights | Kurarin Solutions",
  description: "Practical perspectives on technology, digital products, software, and better ways to work. Articles published through the Kurarin CMS appear here automatically.",
  alternates: { canonical: "/blog/" },
};

export default async function BlogPage() {
  // Keep the existing Supabase-backed CMS adapter as the single source for published posts.
  const blogPosts = await getPublicBlogPosts();
  const featured = blogPosts.find((post) => post.featured) ?? blogPosts[0];
  const latest = blogPosts.filter((post) => post.slug !== featured?.slug).slice(0, 2);

  return <main className="ks-editorial-blog">
    <section className="ks-blog-hero"><div className="ks-blog-hero__copy"><p className="ks-eyebrow"><span /> THE KURARIN JOURNAL</p><h1>Ideas worth<br /><em>keeping.</em></h1><p>Clear thinking on technology, digital experiences and the decisions that help businesses move forward.</p><div className="ks-blog-hero__bottom"><span>NOTES ON BUILDING BETTER</span><a href="#all-articles">Explore the journal ↓</a></div></div><div className="ks-blog-hero__art" aria-hidden="true"><div className="ks-blog-art-grid"/><div className="ks-blog-art-ring ks-blog-art-ring--one"/><div className="ks-blog-art-ring ks-blog-art-ring--two"/><div className="ks-blog-art-card"><small>FIELD NOTES / KS</small><strong>Knowledge<br /><em>into action.</em></strong><span>IDEAS · SYSTEMS · PEOPLE</span></div><i className="ks-blog-art-dot ks-blog-art-dot--one"/><i className="ks-blog-art-dot ks-blog-art-dot--two"/></div></section>
    <section className="ks-blog-featured"><div className="ks-blog-section-head"><div><p className="ks-eyebrow"><span /> START HERE</p><h2>Worth your<br /><em>attention.</em></h2></div><p>Useful ideas, considered perspectives and practical reading for people building what comes next.</p></div>
      {featured ? <div className="ks-blog-featured-grid"><div className="ks-blog-featured-main"><BlogCard post={featured} featured /></div><div className="ks-blog-latest">{latest.map((post) => <BlogCard post={post} key={post.slug} />)}<div className="ks-blog-note"><span>KS<span className="ks-red-dot">.</span></span><div><strong>Knowledge worth keeping.</strong><p>Explore the archive for more ideas and practical guidance.</p></div></div></div></div> : <div className="ks-blog-empty"><span>01 / JOURNAL</span><h2>New insights are on the way.</h2><p>There are no published articles available yet. Once an article is published through the Kurarin CMS, it will appear here automatically.</p><Link href="/contact/">Have a topic in mind? Talk to us →</Link></div>}
    </section>
    <section className="ks-blog-archive" id="all-articles"><div className="ks-blog-section-head"><div><p className="ks-eyebrow"><span /> THE ARCHIVE</p><h2>Explore all <em>insights.</em></h2></div><p>Search published articles by keyword or category. Editorial updates made in the CMS flow through to this page.</p></div><BlogSearch posts={blogPosts} /></section>
    <section className="ks-blog-cta"><div><p className="ks-eyebrow"><span /> KEEP THE CONVERSATION GOING</p><h2>Have a challenge<br />worth <em>solving?</em></h2></div><div><p>Reading can spark an idea. Let’s discuss how to put yours into practice.</p><Link href="/contact/">Talk to Kurarin <span>↗</span></Link></div></section>
  </main>;
}
