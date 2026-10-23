import Link from "next/link";
import { formatBlogDate, type BlogPost } from "@/config/blog";

export function BlogCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article className={`blog-card${featured ? " blog-card--featured" : ""}`}>
      <Link className="blog-card__image" href={`/blog/${post.slug}/`} aria-label={`Read ${post.title}`}>
        <span className="blog-card__image-orb" aria-hidden="true" />
        <span className="blog-card__image-mark" aria-hidden="true">K<span>.</span></span>
        <span className="blog-card__category">{post.category}</span>
      </Link>
      <div className="blog-card__body">
        <div className="blog-card__meta">
          <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readMinutes} min read</span>
        </div>
        <h2><Link href={`/blog/${post.slug}/`}>{post.title}</Link></h2>
        <p>{post.excerpt}</p>
        <Link className="blog-card__link" href={`/blog/${post.slug}/`}>
          Read article <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
