// Shows the generated image along with download and reset buttons

function ResultImage({ imageUrl, onReset }) {
  if (!imageUrl) return null

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = `ghibli-art-${Date.now()}.png`
    link.click()
  }

  return (
    <div className="result">
      <p className="result-title">Your Ghibli Art</p>

      <div className="result-image-wrap">
        <img src={imageUrl} alt="Generated Ghibli art" />
      </div>

      <div className="result-actions">
        <button className="btn-secondary" onClick={handleDownload}>
          ⬇ Download
        </button>
        <button className="btn-outline" onClick={onReset}>
          🔄 Generate Another
        </button>
      </div>
    </div>
  )
}

export default ResultImage
