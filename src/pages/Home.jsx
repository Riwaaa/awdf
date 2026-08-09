import Header from "../components/Header";
import About from "../components/About";
import Skills from "../components/Skills";
import Footer from "../components/Footer";

function Home() {
  const skills = [
    "React",
    "JavaScript",
    "C++",
    "HTML & CSS",
    "MySQL",
    "UI/UX",
  ];

  return (
    <>
      <Header />

      <main>
        <About />

        <Skills skillList={skills} />

        {/* What I Do */}
        <section className="portfolio-section">
          <span className="section-tag">WHAT I DO</span>

          <h2>Building ideas into digital experiences.</h2>

          <div className="portfolio-grid">
            <div className="portfolio-card">
              <span className="card-number">01</span>
              <h3>Web Development</h3>
              <p>
                I build responsive and interactive web applications using
                modern frontend technologies like React, JavaScript, HTML and
                CSS.
              </p>
            </div>

            <div className="portfolio-card">
              <span className="card-number">02</span>
              <h3>UI / UX Design</h3>
              <p>
                I focus on creating clean interfaces with simple navigation,
                good visual hierarchy and a smooth user experience.
              </p>
            </div>

            <div className="portfolio-card">
              <span className="card-number">03</span>
              <h3>Problem Solving</h3>
              <p>
                I enjoy turning real-world problems into practical software
                solutions through development and experimentation.
              </p>
            </div>
          </div>
        </section>

        {/* My Approach */}
        <section className="portfolio-section">
          <span className="section-tag">MY APPROACH</span>

          <h2>Simple. Functional. Always improving.</h2>

          <p className="approach-text">
            I prefer building projects by first understanding the problem,
            breaking it into smaller parts, and then developing a solution
            that is simple enough to use and flexible enough to improve later.
          </p>

          <div className="approach-points">
            <div>
              <strong>01</strong>
              <span>Understand the problem</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Design the solution</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Build & test</span>
            </div>

            <div>
              <strong>04</strong>
              <span>Improve continuously</span>
            </div>
          </div>
        </section>

        {/* Currently Exploring */}
        <section className="portfolio-section exploring">
          <span className="section-tag">CURRENTLY EXPLORING</span>

          <h2>Learning something new every day.</h2>

          <p>
            Currently exploring deeper concepts in full-stack development,
            databases, cybersecurity and modern web technologies while
            continuing to build real-world projects.
          </p>

          <div className="explore-tags">
            <span>Full Stack Development</span>
            <span>Cybersecurity</span>
            <span>Backend Development</span>
            <span>Cloud & Deployment</span>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;