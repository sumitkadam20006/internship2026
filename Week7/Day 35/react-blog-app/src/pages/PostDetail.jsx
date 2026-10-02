import { useParams, useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { FiArrowLeft, FiClock } from "react-icons/fi";

import { useFetch } from "../hooks/useFetch";

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
const getAuthorName = (id) => authors[id % authors.length];
const getAvatarColor = (id) => avatarColors[id % avatarColors.length];
const getDate = (id) => {
  const d = new Date(2025, 0, 1);
  d.setDate(d.getDate() + (id % 365));
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
};
const getReadingTime = (body) => Math.max(1, Math.round(body.split(" ").length / 200));

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: post,
    loading,
    error,
    refetch
  } = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  const {
    data: author
  } = useFetch(
    post
      ? `https://jsonplaceholder.typicode.com/users/${post.userId}`
      : null
  );

  if (loading) {
    return (
      <div className="container post-detail-page">
        <div className="detail-skeleton">
          <div className="skeleton skeleton-cover" />
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-title-short" />
          <div className="skeleton-author-row">
            <div className="skeleton skeleton-avatar" />
            <div className="skeleton skeleton-author-line" />
          </div>
          <div className="skeleton skeleton-line skeleton-line-wide" />
          <div className="skeleton skeleton-line skeleton-line-wide" />
          <div className="skeleton skeleton-line skeleton-line-medium" />
          <div className="skeleton skeleton-line skeleton-line-wide" />
          <div className="skeleton skeleton-line skeleton-line-narrow" />
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line skeleton-line-medium" />
          <div className="skeleton skeleton-line" />
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
          <h2>Failed to load article</h2>
          <p>{error}</p>
          <button className="btn-primary" onClick={refetch}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const category = getCategory(Number(id));
  const authorName = getAuthorName(Number(id));
  const avatarColor = getAvatarColor(Number(id));
  const date = getDate(Number(id));
  const readingTime = getReadingTime(post.body);

  const relatedIds = [Number(id) + 1, Number(id) + 2, Number(id) + 3];

  return (
    <div className="container post-detail-page animate-fade-in">
      <button className="post-detail-back" onClick={() => navigate("/")}>
        <FiArrowLeft /> Back to articles
      </button>

      <div className="post-detail-cover">
        <img
          src={`https://picsum.photos/1200/600?random=${id}`}
          alt={post.title}
          loading="eager"
        />
      </div>

      <article className="post-detail-article">
        <header className="post-detail-header">
          <span className="post-detail-category">{category}</span>

          <h1>{post.title}</h1>

          <div className="post-detail-meta">
            <div className="post-detail-author">
              <img
                src={`https://ui-avatars.com/api/?name=${authorName.replace(/\s/g, "+")}&background=${avatarColor}&color=fff&size=44`}
                alt={authorName}
                width="44"
                height="44"
              />
              <div className="post-detail-author-info">
                <span className="post-detail-author-name">
                  {author ? author.name : authorName}
                </span>
                {author && (
                  <span className="post-detail-author-role">
                    {author.email}
                  </span>
                )}
              </div>
            </div>

            <span className="post-detail-meta-separator" />
            <span className="post-detail-date">{date}</span>

            <span className="post-detail-meta-separator" />
            <span className="post-detail-reading-time">
              <FiClock style={{ fontSize: 13 }} /> {readingTime} min read
            </span>
          </div>
        </header>

        <div className="post-detail-body">
          {post.body.split("\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      <section className="related-section">
        <h2>More articles you might like</h2>
        <div className="related-grid">
          {relatedIds.map(rid => (
            <div key={rid} className="related-card">
              <div className="related-card-image">
                <img
                  src={`https://picsum.photos/400/250?random=${rid}`}
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="related-card-body">
                <h4>{getAuthorName(rid)}&rsquo;s Guide to {getCategory(rid)}</h4>
                <span>{getDate(rid)} &middot; {getReadingTime("word ".repeat(200))} min read</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PostDetail;