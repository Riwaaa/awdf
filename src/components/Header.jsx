import { Link } from "react-router-dom";

function Header() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="small-text">HEY, I'M</p>

        <h1>
          Riwaa <span>Ramani</span>
        </h1>

        <h2>Computer Engineering Student & Creative Developer</h2>

        <p className="hero-description">
          I love creating modern websites, exploring new technologies,
          and turning simple ideas into useful digital experiences.
        </p>

        <div className="hero-buttons">
          <Link to="/projects" className="btn primary">
            Explore My Work
          </Link>

          <Link to="/contact" className="btn secondary">
            Let's Talk
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Header;