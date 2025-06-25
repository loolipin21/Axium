import { motion } from "framer-motion";
import type { Recipe } from "../services/recipeService";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
  if (!recipes.length) return null;

  return (
    <motion.section
      className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {recipes.map((r) => (
        <motion.div
          key={r.id}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <RecipeCard recipe={r} />
        </motion.div>
      ))}
    </motion.section>
  );
}
