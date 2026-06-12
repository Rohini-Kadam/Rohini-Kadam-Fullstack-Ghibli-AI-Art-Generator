// Textarea for entering the scene description / prompt

function PromptInput({ prompt, setPrompt }) {
  return (
    <div className="form-group">
      <label className="form-label">Prompt</label>
      <textarea
        className="form-textarea"
        placeholder="Describe the scene you want to generate..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
      />
    </div>
  )
}

export default PromptInput
