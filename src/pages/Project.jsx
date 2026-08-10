import { useEffect, useState } from "react";

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.github.com/users/Riwaaa/repos")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch GitHub repositories");
        }
        return res.json();
      })
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="projects-section">
      <span className="section-label">GITHUB</span>

      <h2 className="section-title">My Repositories</h2>

      {loading && (
        <p className="loading-message">
          Loading repositories...
        </p>
      )}

      {error && (
        <p className="error-message">
          Error: {error}
        </p>
      )}

      {!loading && !error && (
        <div className="projects-grid">
          {repos.map((repo) => (
            <div className="project-card" key={repo.id}>
              <div>
                <span className="project-number">
                  GITHUB PROJECT
                </span>

                <h3>{repo.name}</h3>

                <p>
                  {repo.description || "No description available."}
                </p>
              </div>

              <span className="project-tech">
                {repo.language || "GitHub"}
              </span>

              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Repository →
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;