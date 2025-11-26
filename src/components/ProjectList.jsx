import ProjectItem from './ProjectItem'
import { projects } from '../data/projects'

function ProjectList({ onProjectClick }) {
  return (
    <>
      {projects.map((project) => (
        <ProjectItem key={project.number} project={project} onProjectClick={onProjectClick} />
      ))}
    </>
  )
}

export default ProjectList
