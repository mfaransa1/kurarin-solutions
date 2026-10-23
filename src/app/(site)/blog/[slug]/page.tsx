import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { formatBlogDate } from "@/config/blog";
import { getPublicBlogPosts, getPublicBlogPostBySlug } from "@/lib/blog/public-posts";

type BlogArticleProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPublicBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublicBlogPostBySlug(slug);
  if (!post) return { title: "Article not found" };

  const enriched = post as typeof post & { seoTitle?: string; seoDescription?: string; canonicalUrl?: string };
  return {
    title: enriched.seoTitle || post.title,
    description: enriched.seoDescription || post.excerpt,
    alternates: { canonical: enriched.canonicalUrl || `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      title: enriched.seoTitle || post.title,
      description: enriched.seoDescription || post.excerpt,
      publishedTime: new Date(`${post.date}T12:00:00Z`).toISOString(),
      images: post.image ? [{ url: post.image }] : undefined,
    },
  };
}

function isCmsArticle(post: { status: string; content?: string }): boolean {
  return post.status === "published" && Boolean(post.content?.trim());
}

function renderPlainText(content: string) {
  // CMS content is intentionally treated as plain text. Do not render stored HTML.
  return content.split(/\n{2,}/).map((paragraph, index) => (
    <p key={index}>{paragraph.split("\n").map((line, lineIndex) => (
      <span key={lineIndex}>{line}{lineIndex < paragraph.split("\n").length - 1 ? <br /> : null}</span>
    ))}</p>
  ));
}

export default async function BlogArticlePage({ params }: BlogArticleProps) {
  const { slug } = await params;
  const post = await getPublicBlogPostBySlug(slug);
  if (!post) notFound();

  const related = (await getPublicBlogPosts())
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, 3);
  const cmsArticle = isCmsArticle(post);
  const enriched = post as typeof post & { content?: string; seoTitle?: string; seoDescription?: string; canonicalUrl?: string };

  return (
    <>
      <section className="article-hero">
        <Container>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <span className="breadcrumbs__item"><Link href="/">Home</Link><span aria-hidden="true">/</span></span>
            <span className="breadcrumbs__item"><Link href="/blog/">Blog</Link><span aria-hidden="true">/</span></span>
            <span className="breadcrumbs__item"><span aria-current="page">{post.title}</span></span>
          </nav>
          <div className="article-hero__layout">
            <div>
              <p className="eyebrow"><span /> {post.category}</p>
              <h1>{post.title}</h1>
              <p className="article-hero__excerpt">{post.excerpt}</p>
              <div className="article-hero__meta"><span>Kurarin Solutions</span><span>·</span><time dateTime={post.date}>{formatBlogDate(post.date)}</time><span>·</span><span>{post.readMinutes} min read</span></div>
            </div>
            <div className="article-hero__art" aria-hidden="true"><span>K<span>.</span></span><i /><b /></div>
          </div>
        </Container>
      </section>

      <Section className="article-body-section">
        <Container>
          <div className="article-layout">
            <article className="article-content">
              {cmsArticle ? (
                <>
                  {enriched.content ? renderPlainText(enriched.content) : null}
                  <div className="article-content__cta">
                    <h2>Have a related question?</h2>
                    <p>Tell us what you are trying to achieve and we can discuss the next step.</p>
                    <ButtonLink href="/contact/">Talk to Kurarin <span aria-hidden="true">↗</span></ButtonLink>
                  </div>
                </>
              ) : (
                <>
                  <div className="migration-notice">
                    <strong>Content migration pending</strong>
                    <p>This page is using archive metadata as a migration placeholder. The original article text, images, author details, and canonical URL must be imported and reviewed before this legacy page is published as complete content.</p>
                    {post.sourceUrl ? <a href={post.sourceUrl} target="_blank" rel="noreferrer">View the current source page ↗</a> : null}
                  </div>
                  <h2>About this article</h2>
                  <p>{post.excerpt}</p>
                  <p>The new blog is being prepared to preserve the existing archive while improving readability, navigation, accessibility, and search. This placeholder is intentionally not presented as the full original article.</p>
                  <div className="article-content__cta">
                    <h2>Have a related question?</h2>
                    <p>Tell us what you are trying to achieve and we can discuss the next step.</p>
                    <ButtonLink href="/contact/">Talk to Kurarin <span aria-hidden="true">↗</span></ButtonLink>
                  </div>
                </>
              )}
            </article>
            <aside className="article-sidebar">
              <p className="eyebrow"><span /> In this article</p>
              <p className="article-sidebar__text">Category</p>
              <Link className="article-sidebar__category" href="/blog/">{post.category}</Link>
              <div className="article-sidebar__divider" />
              <p className="article-sidebar__text">Explore more</p>
              <Link className="text-link" href="/blog/">All insights <span aria-hidden="true">↗</span></Link>
            </aside>
          </div>
        </Container>
      </Section>

      {related.length ? (
        <Section className="article-related">
          <Container>
            <div className="blog-section-heading">
              <div><p className="eyebrow"><span /> Keep exploring</p><h2 className="section-title">Related <span>reading.</span></h2></div>
              <Link className="text-link" href="/blog/">Visit the blog <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="article-related__grid">
              {related.map((item) => (
                <Link className="article-related__card" href={`/blog/${item.slug}/`} key={item.slug}>
                  <span className="article-related__category">{item.category}</span>
                  <h3>{item.title}</h3>
                  <span className="text-link">Read article <span aria-hidden="true">↗</span></span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
