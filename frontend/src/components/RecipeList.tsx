import type { Recipe } from "../services/recipeService";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
  if (!recipes.length) return null;

  return (
    <section className="recipe-grid">
      {recipes.map((r) => (
        <div key={r.id}>
          <RecipeCard recipe={r} />
        </div>
      ))}
    </section>
  );
}
