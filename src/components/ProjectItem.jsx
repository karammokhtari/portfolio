function ProjectItem({ project, onProjectClick }) {
  const handleClick = () => {
    onProjectClick(project)
  }

  return (
    <div className="project-item">
      <div className="project-header">
        <button type="button" className="project-image" onClick={handleClick}>
          {project.images.hero && <img src={project.images.hero} alt={project.title} />}
        </button>
        <div className="project-info">
          <div className="project-title">
            {project.number}—{project.title}
          </div>
          <div className="project-code">{project.code}</div>
          <div className="project-description">{project.description}</div>
          <button type="button" onClick={handleClick} className="project-link">
            Read more…
          </button>
        </div>
        <div className="project-icon">⌘</div>
      </div>
    </div>
  )
}

export default ProjectItem
