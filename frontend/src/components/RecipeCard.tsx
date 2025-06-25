import { motion } from "framer-motion";
import { ChefHat, Flame } from "lucide-react";
import type { Recipe } from "../services/recipeService";

interface Props {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: Props) {
  return (
    <motion.article
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-zinc-800 flex flex-col h-full"
    >
      {/* Decorative gradient header */}
      <div className="h-2 w-full bg-gradient-to-r from-teal-500 via-sky-500 to-fuchsia-600" />

      <div className="p-6 space-y-4 flex flex-col flex-grow">
        <header className="flex items-center gap-2">
          <ChefHat className="w-5 h-5 text-teal-600" />
          <h3 className="font-semibold text-lg leading-tight dark:text-white">
            {recipe.title}
          </h3>
        </header>

        <section className="flex-1 space-y-2 overflow-hidden">
          <h4 className="font-medium dark:text-zinc-200">Ingredients</h4>
          <ul className="list-disc list-inside marker:text-teal-500 space-y-0.5 text-sm dark:text-zinc-300">
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>

          <h4 className="mt-4 font-medium dark:text-zinc-200">Instructions</h4>
          <p className="text-sm leading-relaxed dark:text-zinc-300 whitespace-pre-line">
            {recipe.instructions}
          </p>
        </section>

        {recipe.calories && (
          <footer className="pt-4 border-t border-zinc-100 dark:border-zinc-700 flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
            <Flame className="w-4 h-4" />
            {recipe.calories} kcal
          </footer>
        )}
      </div>
    </motion.article>
  );
}