import InputForm     from './components/InputForm'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorAlert     from './components/ErrorAlert'
import RecipeList     from './components/RecipeList'
import { useRecipes } from './hooks/useRecipes'

export default function App() {
  const { recipes, loading, error, search } = useRecipes();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center
                     bg-gradient-to-br from-lime-50 via-emerald-50 to-teal-100
                     px-4 sm:px-6">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight
                     text-emerald-600 drop-shadow mb-10">
        AI Recipe Generator
      </h1>

      <div className="w-full max-w-xl">
        <InputForm onSubmit={search} />
      </div>

      {loading && <LoadingSpinner className="mt-8" />}
      {error   && <ErrorAlert message={error} className="mt-8" />}

      {/* 🍲 recipe list in a frosted-glass card */}
      <section className="glass-card w-full max-w-3xl mt-12">
        <RecipeList recipes={recipes} />
      </section>
    </main>
  );
}
