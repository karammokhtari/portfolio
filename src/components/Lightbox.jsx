import { useCallback, useEffect, useState } from 'react'

function Lightbox({ images, currentIndex, onClose, onNavigate }) {
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
    }, 200) // Match animation duration
  }, [onClose])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopImmediatePropagation()
        handleClose()
      } else if (e.key === 'ArrowLeft') {
        onNavigate('prev')
      } else if (e.key === 'ArrowRight') {
        onNavigate('next')
      }
    }

    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [onNavigate, handleClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!images[currentIndex]) return null

  return (
    <div
      className={`lightbox-backdrop ${isClosing ? 'lightbox-closing' : ''}`}
      onClick={handleBackdropClick}
      onKeyDown={(e) => e.key === 'Escape' && handleClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className={`lightbox-content ${isClosing ? 'lightbox-zoom-out' : 'lightbox-zoom-in'}`}>
        <button type="button" className="lightbox-close" onClick={handleClose}>
          ✕
        </button>

        <div className="lightbox-image-container">
          <img src={images[currentIndex]} alt={`${currentIndex + 1} of ${images.length}`} />
        </div>

        <div className="lightbox-controls">
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={() => onNavigate('prev')}
            disabled={currentIndex === 0}
          >
            ←
          </button>

          <div className="lightbox-counter">
            {currentIndex + 1} / {images.length}
          </div>

          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={() => onNavigate('next')}
            disabled={currentIndex === images.length - 1}
          >
            →
          </button>
        </div>
      </div>
    </div>
  )
}

export default Lightbox
