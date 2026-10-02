import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiHeart, FiBookmark, FiSearch, FiX } from "react-icons/fi";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

import { useFetch } from "../hooks/useFetch";
import { useDebounce } from "../hooks/useDebounce";
import SkeletonCard from "./SkeletonCard";
import "./PostList.css";

const categories = [
  "React", "JavaScript", "Frontend", "Hooks",
  "Routing", "CSS", "TypeScript", "Performance"
];

const authors = [
  "Sarah Chen", "Marcus Johnson", "Elena Rodriguez",
  "David Kim", "Priya Patel", "Alex Thompson", "Maria Garcia"
];

const avatarColors = [
  "4f46e5", "0891b2", "059669", "d97706",
  "dc2626", "7c3aed", "db2777", "2563eb"
];

const getCategory = (id) => categories[id % categories.length];
const getAuthor = (id) => authors[id % authors.length];
const getAvatarColor = (id) => avatarColors[id % avatarColors.length];

const getDate = (id) => {
  const d = new Date(2025, 0, 1);
  d.setDate(d.getDate() + (id % 365));
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const getReadingTime = (body) => Math.max(1, Math.round(body.split(" ").length / 200));

function PostList() {
  const {
    data: posts,
    loading,
    error,
    refetch
  } = useFetch("https://jsonplaceholder.typicode.com/posts");

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  if (loading) {
    return (
      <div className="container">
        <section className="hero-section">
          <div className="hero-bg-orb hero-bg-orb--top-right" />
          <div className="hero-bg-orb hero-bg-orb--bottom-left" />
          <div className="hero-floating-circle hero-floating-circle--small" />
          <div className="hero-floating-circle hero-floating-circle--medium" />
          <div className="hero-content">
            <span className="hero-badge">
              <span className="hero-badge-dot" />
              Latest React Articles
            </span>
            <h1 className="hero-title">
              Learn React<br />
              <span className="gradient-text">One Blog At A Time</span>
            </h1>
            <p className="hero-subtitle">
              Explore tutorials, React concepts, hooks, routing,
              performance tips, and modern frontend development.
            </p>
          </div>
        </section>
        <div className="post-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-state">
          <div className="error-icon-wrap">
            <HiOutlineExclamationCircle />
          </div>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button className="btn-primary" onClick={refetch}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <div className="container">
      <section className="hero-section">
        <div className="hero-bg-orb hero-bg-orb--top-right" />
        <div className="hero-bg-orb hero-bg-orb--bottom-left" />
        <div className="hero-floating-circle hero-floating-circle--small" />
        <div className="hero-floating-circle hero-floating-circle--medium" />
        <div className="hero-content">
          <span className="hero-badge">
            <span className="hero-badge-dot" />
            Latest React Articles
          </span>
          <h1 className="hero-title">
            Learn React<br />
            <span className="gradient-text">One Blog At A Time</span>
          </h1>
          <p className="hero-subtitle">
            Explore tutorials, React concepts, hooks, routing,
            performance tips, and modern frontend development.
          </p>
          <div className="hero-actions">
            <button
              className="btn-primary"
              onClick={() => {
                const grid = document.getElementById("blog-grid");
                if (grid) {
                  grid.scrollIntoView({ behavior: "smooth", block: "start" });
                } else {
                  window.scrollTo({ top: 700, behavior: "smooth" });
                }
              }}
            >
              Browse Articles
            </button>
            <a
              href="https://jsonplaceholder.typicode.com/posts"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Explore API
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-value">{posts.length}+</div>
              <div className="hero-stat-label">Articles</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">{categories.length}</div>
              <div className="hero-stat-label">Topics</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">{authors.length}</div>
              <div className="hero-stat-label">Writers</div>
            </div>
          </div>
        </div>
      </section>

      <div className="search-section" id="blog-grid">
        <div className="search-wrapper">
          <div className="search-icon-wrap">
            <FiSearch />
          </div>
          <input
            id="search-input"
            className="search-input"
            type="text"
            placeholder="Search articles by title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {!query && (
            <div className="search-shortcut">
              <kbd>⌘</kbd>
              <kbd>K</kbd>
            </div>
          )}
        </div>

        <div className="search-results-info">
          <p className="results-count">
            Showing <strong>{filteredPosts.length}</strong> of <strong>{posts.length}</strong> articles
          </p>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-illustration">
            <span className="empty-illustration-bar" />
            <span className="empty-illustration-bar" />
            <span className="empty-illustration-bar" />
            <span className="empty-illustration-bar" />
            <span className="empty-illustration-bar" />
          </div>
          <div className="empty-icon-wrap">
            <FiSearch />
          </div>
          <h3>No articles found</h3>
          <p>Try a different search term or browse all articles below.</p>
          <button className="btn-ghost" onClick={() => setQuery("")}>
            <FiX /> Clear search
          </button>
        </div>
      ) : (
        <div className="post-grid">
          {filteredPosts.map(post => {
            const author = getAuthor(post.id);
            const category = getCategory(post.id);
            const avatarColor = getAvatarColor(post.id);
            const date = getDate(post.id);
            const readingTime = getReadingTime(post.body);

            return (
              <Link
                key={post.id}
                to={`/posts/${post.id}`}
                className="blog-card"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="blog-card__image">
                  <img
                    src={`https://picsum.photos/600/350?random=${post.id}`}
                    alt={post.title}
                    loading="lazy"
                  />
                </div>

                <div className="blog-card__body">
                  <span className="blog-card__category">
                    <span className="category-dot" />
                    {category}
                  </span>

                  <h3 className="blog-card__title">{post.title}</h3>

                  <p className="blog-card__preview">
                    {post.body.slice(0, 120)}...
                  </p>

                  <div className="blog-card__author">
                    <img
                      className="blog-card__avatar"
                      src={`https://ui-avatars.com/api/?name=${author.replace(/\s/g, "+")}&background=${avatarColor}&color=fff&size=36`}
                      alt={author}
                      width="36"
                      height="36"
                      loading="lazy"
                    />
                    <div className="blog-card__author-info">
                      <span className="blog-card__author-name">{author}</span>
                      <span className="blog-card__meta">
                        {readingTime} min read &middot; {date}
                      </span>
                    </div>
                  </div>

                  <div className="blog-card__footer">
                    <span className="blog-card__read-more">
                      Read More <FiArrowRight />
                    </span>
                    <div className="blog-card__actions">
                      <span
                        className="blog-card__action-btn"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        role="button"
                        tabIndex={0}
                        aria-label="Like"
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); e.stopPropagation(); } }}
                      >
                        <FiHeart />
                      </span>
                      <span
                        className="blog-card__action-btn blog-card__action-btn--bookmark"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        role="button"
                        tabIndex={0}
                        aria-label="Bookmark"
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); e.stopPropagation(); } }}
                      >
                        <FiBookmark />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PostList;