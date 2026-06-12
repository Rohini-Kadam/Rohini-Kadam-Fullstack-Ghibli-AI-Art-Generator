import { useState } from 'react'
import { generateFromImage, generateFromText } from './api'

import ModeTabs from './components/ModeTabs'
import ImageUploader from './components/ImageUploader'
import StyleSelect from './components/StyleSelect'
import PromptInput from './components/PromptInput'
import Loader from './components/Loader'
import ResultImage from './components/ResultImage'

function App() {
  // ----- which mode are we in: "image" or "text" -----
  const [mode, setMode] = useState('image')

  // ----- form fields -----
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('general')
  const [imageFile, setImageFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  // ----- request state -----
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resultUrl, setResultUrl] = useState(null)

  // Called when user selects a file in ImageUploader
  const handleFileChange = (file) => {
    setImageFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  // Switch between Image and Text mode
  const handleModeChange = (newMode) => {
    setMode(newMode)
    setResultUrl(null)
    setError('')
  }

  // Reset everything to start fresh
  const handleReset = () => {
    setPrompt('')
    setStyle('general')
    setImageFile(null)
    setPreviewUrl(null)
    setResultUrl(null)
    setError('')
  }

  // Main "Generate" button click handler
  const handleGenerate = async () => {
    setError('')

    // ----- basic validation -----
    if (!prompt.trim()) {
      setError('Please enter a prompt.')
      return
    }
    if (mode === 'image' && !imageFile) {
      setError('Please upload an image.')
      return
    }

    setLoading(true)
    setResultUrl(null)

    try {
      let imageBlob

      if (mode === 'image') {
        // calls POST /api/v1/generate
        imageBlob = await generateFromImage(imageFile, prompt)
      } else {
        // calls POST /api/v1/generate-from-text
        imageBlob = await generateFromText(prompt, style)
      }

      const url = URL.createObjectURL(imageBlob)
      setResultUrl(url)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      {/* ---------- Header ---------- */}
      <header className="app-header">
        <h1>Studio Ghibli Art Generator</h1>
        <p>Turn your photos or ideas into Ghibli-style art</p>
      </header>

      {/* ---------- Mode Tabs ---------- */}
      <ModeTabs mode={mode} setMode={handleModeChange} />

      {/* ---------- Form Card ---------- */}
      <div className="card">
        {mode === 'image' && (
          <ImageUploader
            imageFile={imageFile}
            previewUrl={previewUrl}
            onFileChange={handleFileChange}
          />
        )}

        {mode === 'text' && <StyleSelect style={style} setStyle={setStyle} />}

        <PromptInput prompt={prompt} setPrompt={setPrompt} />

        <button className="btn-primary" onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Ghibli Art'}
        </button>

        {loading && <Loader />}

        {error && <div className="error-box">{error}</div>}
      </div>

      {/* ---------- Result ---------- */}
      <ResultImage imageUrl={resultUrl} onReset={handleReset} />
    </div>
  )
}

export default App
