import { useEffect, useState } from 'react'
import Clock from './Clock'
import CV from './CV'
import Profile from './Profile'
import { profileMetadata } from '../data/metadata'
import appMetadata from '../data/app.metadata.json'

function Header({ showCV, setShowCV }) {
  const [hasTransitioned, setHasTransitioned] = useState(false)

  const handleCVClick = () => {
    setHasTransitioned(true)
    setShowCV(true)
  }

  const handleClose = () => {
    setShowCV(false)
  }

  // Handle Escape key to close CV
  useEffect(() => {
    if (!showCV) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopImmediatePropagation()
        setShowCV(false)
      }
    }

    window.addEventListener('keydown', handleEscape, true)
    return () => window.removeEventListener('keydown', handleEscape, true)
  }, [showCV, setShowCV])

  return (
    <>
      {/* Desktop Header */}
      <div className="header-desktop">
        {!showCV ? (
          <div className={hasTransitioned ? 'slide-in-right' : ''}>
            <div className="header-row">
              <div className="logo">{appMetadata.siteTitle}</div>
              <Clock />
            </div>
            <hr />
            <Profile onCVClick={handleCVClick} />
          </div>
        ) : (
          <div className={hasTransitioned ? 'slide-in-left' : ''}>
            <CV onClose={handleClose} />
          </div>
        )}
      </div>

      {/* Mobile Header */}
      <div className="header-mobile">
        {!showCV ? (
          <>
            <div className="header-row">
              <div className="logo">{appMetadata.siteTitle}</div>
              <Clock />
            </div>
            <hr />
            <div className="profile">
              <div className="profile-title">{profileMetadata.title}</div>
              <a href={`mailto:${profileMetadata.email}`}>{profileMetadata.email}</a>
              <a href={profileMetadata.instagram.url} target="_blank" rel="noopener noreferrer">
                {profileMetadata.instagram.label}
              </a>
              <p>{profileMetadata.description[0]}</p>
              <button type="button" onClick={handleCVClick} className="cv-link">
                CV <span className="arrow">→</span>
              </button>
            </div>
          </>
        ) : (
          <CV onClose={handleClose} />
        )}
      </div>
    </>
  )
}

export default Header
