import { useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import MainContent from './components/MainContent'
import VerticalLine from './components/VerticalLine'
// import '@fontsource/ibm-plex-mono/latin-400.css'
// import '@fontsource/ibm-plex-mono/latin-500.css'
// import '@fontsource/ibm-plex-mono/latin-600.css'
import '@fontsource/fira-code/latin-400.css'
import '@fontsource/fira-code/latin-500.css'
import '@fontsource/fira-code/latin-600.css'

function App() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [showCV, setShowCV] = useState(false)

  return (
    <div className="content">
      <Header showCV={showCV} setShowCV={setShowCV} />
      <VerticalLine />
      <MainContent selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
      <Footer
        showCV={showCV}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
    </div>
  )
}

export default App
