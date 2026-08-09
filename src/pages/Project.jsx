const projects = [
  {
    title: "Personal Portfolio",
    description:
      "A responsive personal portfolio designed to showcase my skills, work, and journey as a developer.",
    tech: "React • CSS • JavaScript",
  },
  {
    title: "AWDF Practicals",
    description:
      "A collection of Advanced Web Development Frameworks practicals covering modern web development concepts.",
    tech: "HTML • CSS • JavaScript • React",
  },
  {
    title: "Creative Web Design",
    description:
      "Experimental web interfaces focused on clean layouts, responsive design, and better user experience.",
    tech: "UI/UX • CSS • JavaScript",
  },
];

function Projects() {
  return (
    <section className="section">
      <p className="section-label">SELECTED WORK</p>

      <h2 className="section-title">Things I've built</h2>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card" key={project.title}>
            <div>
              <span className="project-number">
                PROJECT 0{index + 1}
              </span>

              <h3>{project.title}</h3>

              <p>{project.description}</p>
            </div>

            <span className="project-tech">
              {project.tech}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;