// Dropdown for choosing the art style
// Values must match what the backend / Stability AI expects (style_preset)

const STYLE_OPTIONS = [
  { value: 'general', label: 'Ghibli (General)' },
  { value: 'anime', label: 'Anime' },
  { value: 'fantasy-art', label: 'Fantasy Art' },
  { value: 'digital-art', label: 'Digital Art' },
  { value: 'watercolor', label: 'Watercolor' },
  { value: 'cinematic', label: 'Cinematic' },
  { value: 'comic-book', label: 'Comic Book' },
  { value: 'line-art', label: 'Line Art' },
]

function StyleSelect({ style, setStyle }) {
  return (
    <div className="form-group">
      <label className="form-label">Art Style</label>
      <select
        className="form-select"
        value={style}
        onChange={(e) => setStyle(e.target.value)}
      >
        {STYLE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default StyleSelect
