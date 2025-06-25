import './App.css'
import InputForm     from './components/InputForm'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorAlert     from './components/ErrorAlert'
import RecipeList     from './components/RecipeList'
import { useRecipes } from './hooks/useRecipes'

export default function App() {
  const { recipes, loading, error, search } = useRecipes();

  return (
    <main className="app-main">
      <h1 className="app-title">
        AI Recipe Generator
      </h1>
      <div className="form-container">
        <InputForm onSubmit={search} />
      </div>
      {loading && <LoadingSpinner className="mt-8" />}
      {error   && <ErrorAlert message={error} className="mt-8" />}
      <section className="glass-card recipe-list-section">
        <RecipeList recipes={recipes} />
      </section>
    </main>
  );
}
