// ===========================================================
// API SERVICE
// All calls to the Spring Boot backend live here.
// Backend base path: /api/v1 (proxied to http://localhost:8080)
// ===========================================================

const BASE_URL = '/api/v1'

/**
 * Image -> Ghibli art
 * Maps to: POST /api/v1/generate
 * Backend expects multipart/form-data with fields: "image", "prompt"
 */
export async function generateFromImage(imageFile, prompt) {
  const formData = new FormData()
  formData.append('image', imageFile)
  formData.append('prompt', prompt)

  const response = await fetch(`${BASE_URL}/generate`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Failed to generate image. Please try again.')
  }

  // Backend returns raw PNG bytes -> read as Blob
  return response.blob()
}

/**
 * Text -> Ghibli art
 * Maps to: POST /api/v1/generate-from-text
 * Backend expects JSON body: { prompt, style }
 */
export async function generateFromText(prompt, style) {
  const response = await fetch(`${BASE_URL}/generate-from-text`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, style }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate image. Please try again.')
  }

  return response.blob()
}
