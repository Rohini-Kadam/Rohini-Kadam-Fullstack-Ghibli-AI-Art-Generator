// File upload box with image preview
// Calls onFileChange(file) whenever the user picks a file

function ImageUploader({ imageFile, previewUrl, onFileChange }) {
  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      onFileChange(file)
    }
  }

  return (
    <div className="form-group">
      <label className="form-label">Upload Image</label>

      <div className="file-upload">
        <input type="file" accept="image/*" onChange={handleChange} />

        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Preview" className="file-preview" />
            <p className="file-name">{imageFile?.name}</p>
          </>
        ) : (
          <p className="file-upload-text">
            <strong>Click to upload</strong> or drag & drop an image
          </p>
        )}
      </div>
    </div>
  )
}

export default ImageUploader
