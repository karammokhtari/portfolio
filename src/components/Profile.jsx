import { profileMetadata } from '../data/metadata'

function Profile({ onCVClick }) {
  return (
    <div className="profile">
      <div className="profile-title">{profileMetadata.title}</div>
      <div className="profile-links">
        <a href={`mailto:${profileMetadata.email}`}>Email</a>
        <span>•</span>
        <a href={profileMetadata.linkedin.url} target="_blank" rel="noopener noreferrer">
          {profileMetadata.linkedin.label}
        </a>
        <span>•</span>
        <a href={profileMetadata.instagram.url} target="_blank" rel="noopener noreferrer">
          {profileMetadata.instagram.label}
        </a>
      </div>

      {profileMetadata.description.map((paragraph) => (
        <p key={paragraph.substring(0, 20)}>{paragraph}</p>
      ))}

      <ul className="profile-achievements">
        {profileMetadata.achievements.map((achievement) => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>

      <button type="button" onClick={onCVClick} className="cv-link">
        CV <span className="arrow">→</span>
      </button>
    </div>
  )
}

export default Profile
