import { useCallback, useEffect, useState } from 'react'
import ProjectDetail from './ProjectDetail'
import ProjectList from './ProjectList'

function MainContent({ selectedProject, setSelectedProject }) {
  const [savedScrollPosition, setSavedScrollPosition] = useState(0)

  const handleProjectClick = (project) => {
    // Save current scroll position before navigating
    setSavedScrollPosition(window.scrollY)
    setSelectedProject(project)
  }

  const handleBack = useCallback(() => {
    setSelectedProject(null)
  }, [setSelectedProject])

  // Reset scroll to top when showing project detail
  useEffect(() => {
    if (selectedProject) {
      window.scrollTo(0, 0)
    }
  }, [selectedProject])

  // Restore scroll position when returning to project list
  useEffect(() => {
    if (!selectedProject) {
      window.scrollTo(0, savedScrollPosition)
    }
  }, [selectedProject, savedScrollPosition])

  // Handle Escape key to go back
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && selectedProject) {
        handleBack()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [selectedProject, handleBack])

  return (
    <div className="main-content">
      {!selectedProject ? (
        <>
          <div className="section-title">SELECTED WORK</div>
          <hr />
          <ProjectList onProjectClick={handleProjectClick} />
        </>
      ) : (
        <ProjectDetail project={selectedProject} onBack={handleBack} />
      )}
    </div>
  )
}

export default MainContent
