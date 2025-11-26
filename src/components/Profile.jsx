import { profileMetadata } from '../data/metadata'

function Profile({ onCVClick }) {
  return (
    <div className="profile">
      <div className="profile-title">{profileMetadata.title}</div>
      <a href={`mailto:${profileMetadata.email}`}>{profileMetadata.email}</a>
      <a href={profileMetadata.instagram.url} target="_blank" rel="noopener noreferrer">
        {profileMetadata.instagram.label}
      </a>

      {profileMetadata.description.map((paragraph) => (
        <p key={paragraph.substring(0, 20)}>{paragraph}</p>
      ))}

      <button type="button" onClick={onCVClick} className="cv-link">
        CV <span className="arrow">→</span>
      </button>
    </div>
  )
}

export default Profile
