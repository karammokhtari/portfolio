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
      {!showCV && (
        <div className="footer-desktop">
          <div className="copyright">{appMetadata.copyright}</div>
        </div>
      )}

      <div className="footer-mobile">
        {selectedProject ? (
          <button type="button" onClick={handleIndexClick}>
            INDEX
          </button>
        ) : (
          <span />
        )}
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="arrow">↑</span>TOP
        </button>
      </div>
    </>
  )
}

export default Footer
