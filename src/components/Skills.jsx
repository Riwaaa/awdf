function Skills() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "UI / UX Design",
    "Responsive Web Design",
    "Git & GitHub",
    "Problem Solving",
  ];

  return (
    <section className="section">
      <p className="section-label">WHAT I WORK WITH</p>

      <h2 className="section-title">My Skills</h2>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            <span>0{index + 1}</span>
            <h3>{skill}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;