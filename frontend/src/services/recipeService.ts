export interface Recipe {
  id: string
  title: string
  ingredients: string[]
  instructions: string
  calories?: number
}

// helper that turns ingredient list into a prompt
const buildPrompt = (ings: string[]) =>
  `Give me 3 easy recipes that only use: ${ings.join(
    ', ',
  )}. Return STRICT JSON array of objects with the following fields: id, title, ingredients, instructions, estimated_cooking_time, difficulty_level, calories, protein, carbs. Each recipe should include estimated cooking time (in minutes), difficulty level (easy/medium/hard), and basic nutritional information (calories, protein in grams, carbs in grams). Do not include any text before or after the JSON array.`

export async function fetchRecipes(ingredients: string[]): Promise<Recipe[]> {
  const res = await fetch('http://localhost:8000/recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: buildPrompt(ingredients) }),
  })

  if (!res.ok) throw new Error('Failed to fetch recipes')

  // FastAPI gives { response: "…string…" }
  const { response } = (await res.json()) as { response: string }

  // The LLM must return valid JSON per the prompt above
  const recipes = JSON.parse(response) as Recipe[];
  // Ensure ingredients is always an array
  return recipes.map(r => {
    let ings: string[] = [];
    if (Array.isArray(r.ingredients)) {
      ings = r.ingredients;
    } else if (typeof r.ingredients === 'string') {
      ings = (r.ingredients as string).split(',').map((s: string) => s.trim()).filter(Boolean);
    }
    return {
      ...r,
      ingredients: ings,
    };
  });
}