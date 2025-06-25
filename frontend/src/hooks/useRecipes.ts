import { useState } from 'react'
import { fetchRecipes } from '../services/recipeService'
import type { Recipe } from '../services/recipeService'

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function search(ingredientsCSV: string) {
    const ingredients = ingredientsCSV
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    if (!ingredients.length) {
      setError('Please enter at least one ingredient')
      return
    }

    setError(null)
    setLoading(true)
    try {
      const data = await fetchRecipes(ingredients)
      console.log('Received from backend:', data)
      setRecipes(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { recipes, loading, error, search }
} 