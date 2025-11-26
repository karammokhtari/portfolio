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
      <br />

      {cvData.sections.map((section, sectionIndex) => (
        <div key={section.label}>
          <div className="cv-section">
            <div className="cv-section-label">{section.label}</div>
            <div className="cv-section-content">
              {section.items
                ? // Skills section - just items
                  section.items.map((item) => <div key={item}>{parseEmphasis(item)}</div>)
                : // Other sections - entries with items
                  section.entries.map((entry, entryIndex) => (
                    <div key={`${section.label}-entry-${entryIndex}`}>
                      {entryIndex > 0 && <br />}
                      <div className="cv-entry">
                        {entry.items.map((item) =>
                          item === '' ? (
                            <br key={`${section.label}-${entryIndex}-br`} />
                          ) : (
                            <div key={`${section.label}-${entryIndex}-${item.substring(0, 20)}`}>
                              {parseEmphasis(item)}
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          <br />
          <br />
          <br />
          {sectionIndex < cvData.sections.length - 1 && <hr />}
        </div>
      ))}
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* Footer */}
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
