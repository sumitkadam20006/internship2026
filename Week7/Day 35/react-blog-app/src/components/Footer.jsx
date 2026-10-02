import { Link } from "react-router-dom";
import { FaGithub, FaXTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-dot" />
            <span>ReactBlog</span>
          </div>
          <p>
            A modern blog platform built with React. Explore tutorials, guides,
            and insights about frontend development, React hooks, routing, and
            performance.
          </p>
          <div className="footer-social">
            <a href="https://github.com/Atharvpote14" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaXTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
            <a href="mailto:atharvpote14@gmail.com" aria-label="Email">
              <FiMail />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Blog</Link></li>
            <li><Link to="/">Popular</Link></li>
            <li><Link to="/">Recent</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="https://react.dev" target="_blank" rel="noopener noreferrer">React Docs</a></li>
            <li><a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noopener noreferrer">JSONPlaceholder</a></li>
            <li><a href="https://vite.dev" target="_blank" rel="noopener noreferrer">Vite</a></li>
            <li><a href="https://reactrouter.com" target="_blank" rel="noopener noreferrer">React Router</a></li>
          </ul>
        </div>

        <div className="footer-col footer-newsletter">
          <h4>Newsletter</h4>
          <p>Get the latest articles delivered to your inbox every week.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} ReactBlog. All rights reserved.</span>
        <span>A project by Atharv Pote</span>
      </div>
    </footer>
  );
}

export default Footer;