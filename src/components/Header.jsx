import { useEffect, useState } from 'react'
import appMetadata from '../data/app.metadata.json'
import Clock from './Clock'
import CV from './CV'
import Profile from './Profile'

function Header({ showCV, setShowCV }) {
  const [hasTransitioned, setHasTransitioned] = useState(false)

  const handleCVClick = () => {
    setHasTransitioned(true)
    setShowCV(true)
  }

  const handleClose = () => {
    setShowCV(false)
  }

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

      <div className="header-mobile">
        {!showCV ? (
          <>
            <div className="header-row">
              <div className="logo">{appMetadata.siteTitle}</div>
              <Clock />
            </div>
            <hr />
            <Profile onCVClick={handleCVClick} />
          </>
        ) : (
          <CV onClose={handleClose} />
        )}
      </div>
    </>
  )
}

export default Header
