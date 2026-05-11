import appMetadata from '../data/app.metadata.json'
import cvData from '../data/cv.json'

function CV({ onClose }) {
  const parseEmphasis = (text) => {
    if (!text) return null
    if (!text.includes('{em}')) return text

    const parts = text.split(/(\{em\}.*?\{\/em\})/)
    return parts.map((part) => {
      if (part.startsWith('{em}') && part.endsWith('{/em}')) {
        const content = part.replace('{em}', '').replace('{/em}', '')
        return <em key={content}>{content}</em>
      }
      return part
    })
  }

  const renderItem = (item, itemIndex, sectionLabel) => {
    const key = `${sectionLabel}-item-${itemIndex}`

    if (Array.isArray(item)) {
      const lineClassName = sectionLabel === 'Profile' ? 'cv-line cv-contact-line' : 'cv-line'

      return (
        <p key={key} className={lineClassName}>
          {item.map((link, linkIndex) => (
            <span key={link.url}>
              {linkIndex > 0 && ' • '}
              <a href={link.url} target="_blank" rel="noreferrer" className="cv-text-link">
                {link.label}
              </a>
            </span>
          ))}
        </p>
      )
    }

    if (typeof item === 'object' && item.language && item.level) {
      return (
        <p key={key} className="cv-language-line">
          <span className="cv-language-name">{item.language}</span>
          <span className="cv-language-level">({item.level})</span>
        </p>
      )
    }

    if (typeof item === 'object' && item.artist && item.projects) {
      return (
        <p key={key} className="cv-project-line">
          <span className="cv-project-artist">{item.artist}</span>
          <span className="cv-project-title">{item.projects}</span>
        </p>
      )
    }

    if (typeof item === 'object' && item.title && item.meta) {
      return (
        <div key={key} className="cv-education-item">
          <p className="cv-line">{item.title}</p>
          <p className="cv-meta">{item.meta}</p>
        </div>
      )
    }

    if (item === '') {
      return <div key={key} className="cv-spacer" />
    }

    if (sectionLabel === 'Profile' && itemIndex === 0) {
      return (
        <h1 key={key} className="cv-name">
          {parseEmphasis(item)}
        </h1>
      )
    }

    if (sectionLabel === 'Profile' && itemIndex === 1) {
      return (
        <h2 key={key} className="cv-role">
          {parseEmphasis(item)}
        </h2>
      )
    }

    if (sectionLabel === 'Profile' && itemIndex === 2) {
      return (
        <p key={key} className="cv-meta">
          {parseEmphasis(item)}
        </p>
      )
    }

    return (
      <p key={key} className="cv-line">
        {parseEmphasis(item)}
      </p>
    )
  }

  const renderEntryItem = (item, itemIndex, sectionLabel, entryIndex) => {
    const key = `${sectionLabel}-entry-${entryIndex}-item-${itemIndex}`

    if (item === '') {
      return <div key={key} className="cv-spacer" />
    }

    if (itemIndex === 0) {
      return (
        <h3 key={key} className="cv-entry-title">
          {parseEmphasis(item)}
        </h3>
      )
    }

    if (itemIndex === 1) {
      return (
        <h4 key={key} className="cv-entry-meta">
          {parseEmphasis(item)}
        </h4>
      )
    }

    return (
      <p key={key} className="cv-line">
        {parseEmphasis(item)}
      </p>
    )
  }

  return (
    <div className="cv">
      <div className="cv-header">
        <div className="logo">{appMetadata.siteTitle}</div>
        <button type="button" onClick={onClose} className="close-link">
          CLOSE <span className="arrow">→</span>
        </button>
      </div>
      <hr />
      <div className="cv-title">{cvData.title}</div>

      {cvData.sections.map((section, sectionIndex) => (
        <section key={section.label} className="cv-section-wrap">
          <div className="cv-section">
            <h2 className="cv-section-label">{section.label}</h2>
            <div className="cv-section-content">
              {section.items
                ? section.items.map((item, itemIndex) => renderItem(item, itemIndex, section.label))
                : section.entries.map((entry, entryIndex) => (
                    <article key={`${section.label}-entry-${entryIndex}`} className="cv-entry">
                      {entry.items.map((item, itemIndex) =>
                        renderEntryItem(item, itemIndex, section.label, entryIndex),
                      )}
                    </article>
                  ))}
            </div>
          </div>
          {sectionIndex < cvData.sections.length - 1 && <hr />}
        </section>
      ))}

      <div className="cv-footer">
        <div className="cv-updated">Last Updated {cvData.lastUpdated}</div>
        <button type="button" onClick={onClose} className="close-link">
          CLOSE <span className="arrow">→</span>
        </button>
      </div>
    </div>
  )
}

export default CV
