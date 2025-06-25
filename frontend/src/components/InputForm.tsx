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
      className="flex flex-col gap-4 w-full max-w-md mx-auto"
    >
      {error && <ErrorAlert message={error} />}
      <textarea
        className="border p-3 rounded resize-y min-h-[6rem]"
        placeholder="e.g. chicken, rice, broccoli"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          if (error) setError(null)
        }}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
      >
        Generate Recipes
      </button>
    </form>
  )
}
