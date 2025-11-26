import appMetadata from '../data/app.metadata.json'

function Footer({ showCV, selectedProject, setSelectedProject }) {
  const handleIndexClick = () => {
    if (selectedProject) {
      // If in project details, navigate back to project list
      setSelectedProject(null)
      // Scroll to top after navigating back
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0)
    } else {
      // Otherwise just scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Desktop Footer */}
      {!showCV && (
        <div className="footer-desktop">
          <div className="copyright">{appMetadata.copyright}</div>
        </div>
      )}

      {/* Mobile Footer */}
      <div className="footer-mobile">
        <button type="button" onClick={handleIndexClick}>
          INDEX
        </button>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="arrow">↑</span>TOP
        </button>
      </div>
    </>
  )
}

export default Footer
