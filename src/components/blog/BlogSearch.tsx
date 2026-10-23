"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { blogCategories, formatBlogDate, type BlogPost } from "@/config/blog";

export function BlogSearch({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 9;

  const filteredPosts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesQuery = !normalized ||
        `${post.title} ${post.excerpt} ${post.category}`.toLowerCase().includes(normalized);
      const categorySlug = post.category.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const matchesCategory = category === "all" || categorySlug === category;
      return matchesQuery && matchesCategory;
    });
  }, [posts, query, category]);

  const pageCount = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const visiblePosts = filteredPosts.slice((safePage - 1) * pageSize, safePage * pageSize);

  function updateQuery(value: string) {
    setQuery(value);
    setPage(1);
  }

  function updateCategory(value: string) {
    setCategory(value);
    setPage(1);
  }

  return (
    <div className="blog-search">
      <div className="blog-search__controls">
        <label className="blog-search__input-wrap">
          <span className="sr-only">Search articles</span>
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="Search insights..."
          />
        </label>
        <label className="blog-search__select-wrap">
          <span className="sr-only">Filter by category</span>
          <select value={category} onChange={(event) => updateCategory(event.target.value)}>
            {blogCategories.map((item) => (
              <option key={item.slug} value={item.slug}>{item.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="blog-search__result-line" aria-live="polite">
        <p>{filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"} found</p>
        {(query || category !== "all") ? (
          <button type="button" onClick={() => { setQuery(""); setCategory("all"); setPage(1); }}>
            Clear filters
          </button>
        ) : null}
      </div>

      {visiblePosts.length ? (
        <div className="blog-grid">
          {visiblePosts.map((post) => (
            <article className="blog-result" key={post.slug}>
              <Link className="blog-result__visual" href={`/blog/${post.slug}/`} aria-label={`Read ${post.title}`}>
                <span className="blog-result__visual-label">{post.category}</span>
                <span className="blog-result__visual-mark" aria-hidden="true">K<span>.</span></span>
                <span className="blog-result__visual-index">{String(posts.findIndex((item) => item.slug === post.slug) + 1).padStart(2, "0")}</span>
              </Link>
              <div className="blog-result__content">
                <p className="blog-result__meta"><time dateTime={post.date}>{formatBlogDate(post.date)}</time><span>·</span>{post.readMinutes} min read</p>
                <h2><Link href={`/blog/${post.slug}/`}>{post.title}</Link></h2>
                <p className="blog-result__excerpt">{post.excerpt}</p>
                <Link className="blog-card__link" href={`/blog/${post.slug}/`}>Read article <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="blog-empty">
          <span aria-hidden="true">⌕</span>
          <h2>No articles match that search</h2>
          <p>Try another keyword or clear the category filter.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("all"); setPage(1); }}>Show all articles</button>
        </div>
      )}

      {pageCount > 1 ? (
        <nav className="blog-pagination" aria-label="Blog pagination">
          <button type="button" disabled={safePage === 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>← Previous</button>
          <span>Page {safePage} of {pageCount}</span>
          <button type="button" disabled={safePage === pageCount} onClick={() => setPage((current) => Math.min(pageCount, current + 1))}>Next →</button>
        </nav>
      ) : null}
    </div>
  );
}
