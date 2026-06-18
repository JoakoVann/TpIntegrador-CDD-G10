import { useState } from 'react'
import './index.css'
import './App.css'
import Navbar from './components/Navbar'
import ProcessingParams from './components/ProcessingParams'
import ImageComparison from './components/ImageComparison'

const DEFAULT_PARAMS = {
  resolucion: 500,
  bits: 24,
  compresion: 50,
}

function DigitalizacionPage() {
  const [params, setParams] = useState(DEFAULT_PARAMS)
  const [originalImage, setOriginalImage] = useState(null)
  const [processedImage, setProcessedImage] = useState(null)

  const handleImageUpload = (file) => {
    const url = URL.createObjectURL(file)
    setOriginalImage(url)
    setProcessedImage(null)
  }

  const handleApply = () => {
    // TODO: conectar con el backend
    if (originalImage) {
      setProcessedImage(originalImage)
    }
  }

  const handleReset = () => {
    setParams(DEFAULT_PARAMS)
    setOriginalImage(null)
    setProcessedImage(null)
  }

  const handleExport = () => {
    if (!processedImage) return
    const a = document.createElement('a')
    a.href = processedImage
    a.download = 'imagen_digitalizada.png'
    a.click()
  }

  return (
    <div className="page">
      <div className="page__subheader">
        <div className="page__subheader-left">
          <h1 className="page__title">Digitalización de Imágenes</h1>
          <p className="page__subtitle">Muestreo y cuantización de color en imágenes analógicas</p>
        </div>
      </div>

      <div className="page__content">
        <ProcessingParams
          params={params}
          onParamsChange={setParams}
          onApply={handleApply}
          onReset={handleReset}
          onExport={handleExport}
          onImageUpload={handleImageUpload}
        />
        <ImageComparison
          originalImage={originalImage}
          processedImage={processedImage}
        />
      </div>
    </div>
  )
}

function CodificacionPage() {
  return (
    <div className="page">
      <div className="page__subheader">
        <div className="page__subheader-left">
          <h1 className="page__title">Codificación</h1>
          <p className="page__subtitle">Próximamente disponible</p>
        </div>
      </div>
      <div className="coming-soon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        <p>Esta sección estará disponible próximamente.</p>
      </div>
    </div>
  )
}

export default function App() {
  const [activeTab, setActiveTab] = useState('digitalizacion')

  return (
    <div className="app">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="app__main">
        {activeTab === 'digitalizacion' ? <DigitalizacionPage /> : <CodificacionPage />}
      </main>
    </div>
  )
}
