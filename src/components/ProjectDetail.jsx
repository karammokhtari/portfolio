import { useState } from 'react'
import Lightbox from './Lightbox'

function ProjectDetail({ project, onBack }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Combine all images (hero + gallery) and filter out null values
  const allImages = [project.images.hero, ...project.images.gallery].filter((img) => img !== null)

  const openLightbox = (imageIndex) => {
    setLightboxIndex(imageIndex)
    setLightboxOpen(true)
  }

  const handleNavigate = (direction) => {
    if (direction === 'prev' && lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1)
    } else if (direction === 'next' && lightboxIndex < allImages.length - 1) {
      setLightboxIndex(lightboxIndex + 1)
    }
  }

  return (
    <div className="project-detail">
      <div className="project-detail-header">
        <div className="project-detail-title">
          <span className="project-title-highlight">{project.title}</span>
          <span className="arrow-icon">▸</span>
          {project.code}
        </div>
        <button type="button" onClick={onBack} className="back-link">
          <span className="arrow">←</span> BACK
        </button>
      </div>
      <hr />

      {/* Large Hero Image */}
      <div className="project-hero-image">
        {project.images.hero && (
          <img
            src={project.images.hero}
            alt={project.title}
            onClick={() => openLightbox(0)}
            onKeyDown={(e) => e.key === 'Enter' && openLightbox(0)}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>

      {/* Grid of Smaller Images - 2x2 */}
      <div className="project-images-grid">
        {project.images.gallery.map((image, index) => {
          // Calculate the index in allImages array
          const imageIndex = project.images.hero ? index + 1 : index
          return (
            <div key={`${project.number}-gallery-${index}`} className="project-grid-image">
              {image && (
                <img
                  src={image}
                  alt={`${project.title} ${index + 1}`}
                  onClick={() => openLightbox(imageIndex)}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(imageIndex)}
                  style={{ cursor: 'pointer' }}
                />
              )}
            </div>
          )
        })}
      </div>

      <br />

      {/* Project Details */}
      <div className="project-details-content">
        <div className="project-details-left">
          <div className="project-detail-title-small">{project.title}</div>
          <div className="project-detail-code">
            <span className="arrow-icon">▸</span>
            {project.code}
          </div>
          <br />
          <div className="project-detail-meta">
            {project.metadata.subtitle && (
              <div className="meta-item">{project.metadata.subtitle}</div>
            )}
            {project.metadata.author && (
              <div className="meta-item">
                <em>{project.metadata.author}</em>
              </div>
            )}
            {project.metadata.translator && (
              <div className="meta-item">
                Tr. <em>{project.metadata.translator}</em>
              </div>
            )}
            {project.metadata.publisher && (
              <div className="meta-item">Publisher: {project.metadata.publisher}</div>
            )}
            {project.metadata.designer && (
              <div className="meta-item">
                <em>Design: {project.metadata.designer}</em>
              </div>
            )}
          </div>
        </div>

        <div className="project-details-right">
          <div className="project-detail-section-title">DESCRIPTION</div>
          <br />
          <p>{project.description}</p>
          {project.extraDescriptions?.map((desc) => (
            <div key={desc.substring(0, 30)}>
              <br />
              <p className="project-detail-extra">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />

      {lightboxOpen && (
        <Lightbox
          images={allImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  )
}

export default ProjectDetail
