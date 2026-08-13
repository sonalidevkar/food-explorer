import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function FoodDetails() {
  const { id } = useParams();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFavorite, setIsFavorite] = useState(() => {
    try {
      const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

      return favorites.some((item) => item.idMeal === id);
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchFood = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }

        const data = await response.json();

        if (!data.meals || data.meals.length === 0) {
          throw new Error("Recipe not found");
        }

        setFood(data.meals[0]);
      } catch (err) {
        if (err.name === "AbortError") return;

        setError("Unable to load this recipe.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchFood();

    return () => {
      controller.abort();
    };
  }, [id]);

  const toggleFavorite = () => {
    try {
      const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

      const exists = favorites.some(
        (item) => item.idMeal === food.idMeal
      );

      const updatedFavorites = exists
        ? favorites.filter(
            (item) => item.idMeal !== food.idMeal
          )
        : [...favorites, food];

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(!exists);
    } catch {
      console.error("Unable to update favorites");
    }
  };

  if (loading) {
    return (
      <main className="details-status">
        <div className="loader"></div>
        <h2>Preparing your recipe... 🍳</h2>
        <p>Please wait a moment.</p>
      </main>
    );
  }

  if (error || !food) {
    return (
      <main className="details-status">
        <div className="status-icon">😔</div>

        <h1>Recipe Not Found</h1>

        <p>{error}</p>

        <Link to="/foods" className="details-back-btn">
          ← Explore Foods
        </Link>
      </main>
    );
  }

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = food[`strIngredient${i}`];
    const measure = food[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || "",
      });
    }
  }

  return (
    <main className="details-page">
      {/* Back */}
      <Link to="/foods" className="back-link">
        ← Back to Explore
      </Link>

      {/* Hero */}
      <section className="recipe-hero">
        <div className="recipe-image">
          <img
            src={food.strMealThumb}
            alt={food.strMeal}
            width="600"
            height="500"
          />
        </div>

        <div className="recipe-info">
          <span className="recipe-category">
            {food.strCategory || "Recipe"}
          </span>

          <h1>{food.strMeal}</h1>

          <p className="recipe-location">
            🌎 {food.strArea || "International Cuisine"}
          </p>

          <p className="recipe-description">
            Discover how to prepare this delicious
            {food.strMeal} recipe at home.
          </p>

          <div className="recipe-actions">
            <button
              className="main-favorite-btn"
              onClick={toggleFavorite}
            >
              {isFavorite
                ? "❤️ Remove from Favorites"
                : "🤍 Add to Favorites"}
            </button>

            {food.strYoutube && (
              <a
                href={food.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-btn"
              >
                ▶ Watch Recipe
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="ingredients-section">
        <div className="section-heading">
          <span>🛒</span>

          <div>
            <h2>Ingredients</h2>
            <p>Everything you need to prepare this recipe.</p>
          </div>
        </div>

        <div className="ingredients-grid">
          {ingredients.map((item, index) => (
            <div
              className="ingredient-card"
              key={`${item.ingredient}-${index}`}
            >
              <span className="ingredient-number">
                {index + 1}
              </span>

              <div>
                <strong>{item.ingredient}</strong>
                <p>{item.measure}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instructions */}
      <section className="instructions-section">
        <div className="section-heading">
          <span>👨‍🍳</span>

          <div>
            <h2>Cooking Instructions</h2>
            <p>Follow these simple steps to prepare your meal.</p>
          </div>
        </div>

        <div className="instructions-box">
          {food.strInstructions
            ?.split(/\r?\n/)
            .filter((step) => step.trim())
            .map((step, index) => (
              <div
                className="instruction-step"
                key={index}
              >
                <span>{index + 1}</span>

                <p>{step.trim()}</p>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}

export default FoodDetails;