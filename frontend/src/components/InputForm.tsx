import { useState } from 'react'
import type { FormEvent } from 'react'
import ErrorAlert from './ErrorAlert'

interface Props {
  onSubmit: (ingredientsCSV: string) => void
}

export default function InputForm({ onSubmit }: Props) {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!value.trim()) {
      setError('Please enter some ingredients before generating recipes.')
      return
    }
    setError(null)
    onSubmit(value)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="input-form"
    >
      {error && <ErrorAlert message={error} />}
      <textarea
        className="input-textarea"
        placeholder="e.g. chicken, rice, broccoli"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          if (error) setError(null)
        }}
      />
      <button
        type="submit"
        className="input-submit-btn"
      >
        Generate Recipes
      </button>
    </form>
  )
}
