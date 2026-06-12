// Simple loading spinner shown while waiting for the backend response

function Loader() {
  return (
    <div className="loader-wrap">
      <div className="spinner"></div>
      <p className="loader-text">Generating your Ghibli art...</p>
    </div>
  )
}

export default Loader
