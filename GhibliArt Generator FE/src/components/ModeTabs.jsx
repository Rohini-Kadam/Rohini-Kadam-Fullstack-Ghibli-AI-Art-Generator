// Simple tab switcher between "Image" mode and "Text" mode

function ModeTabs({ mode, setMode }) {
  return (
    <div className="tabs">
      <button
        className={`tab-button ${mode === 'image' ? 'active' : ''}`}
        onClick={() => setMode('image')}
      >
        🖼 Image → Ghibli
      </button>
      <button
        className={`tab-button ${mode === 'text' ? 'active' : ''}`}
        onClick={() => setMode('text')}
      >
        ✨ Text → Ghibli
      </button>
    </div>
  )
}

export default ModeTabs
