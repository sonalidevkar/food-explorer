import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    try {
      const saved =
        JSON.parse(localStorage.getItem("favorites")) || [];

      setFavorites(saved);
    } catch {
      setFavorites([]);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter(
      (food) => food.idMeal !== id
    );

    setFavorites(updated);
    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  return (
    <main className="favorites-page">
      <section className="favorites-header">
        <span className="hero-badge">
          ❤️ Your Collection
        </span>

        <h1>
          My <span>Favorite Recipes</span>
        </h1>

        <p>
          Keep all your favorite recipes in one beautiful
          place.
        </p>
      </section>

      {favorites.length === 0 ? (
        <section className="empty-favorites">
          <div className="empty-heart">🤍</div>

          <h2>No Favorites Yet</h2>

          <p>
            You haven't saved any recipes yet.
            Explore delicious foods and save your favorites!
          </p>

          <Link
            to="/foods"
            className="explore-favorites-btn"
          >
            🍔 Explore Foods
          </Link>
        </section>
      ) : (
        <>
          <div className="favorites-toolbar">
            <div>
              <strong>{favorites.length}</strong>{" "}
              {favorites.length === 1
                ? "favorite recipe"
                : "favorite recipes"}
            </div>

            <button
              className="clear-favorites-btn"
              onClick={clearFavorites}
            >
              🗑️ Clear All
            </button>
          </div>

          <section className="food-grid">
            {favorites.map((food) => (
              <article
                className="food-card"
                key={food.idMeal}
              >
                <div className="food-image-wrapper">
                  <img
                    src={food.strMealThumb}
                    alt={food.strMeal}
                    loading="lazy"
                    width="300"
                    height="220"
                  />

                  <button
                    className="favorite-icon"
                    onClick={() =>
                      removeFavorite(food.idMeal)
                    }
                    aria-label={`Remove ${food.strMeal} from favorites`}
                  >
                    ❤️
                  </button>
                </div>

                <div className="food-content">
                  <span className="food-category">
                    {food.strCategory || "Recipe"}
                  </span>

                  <h2>{food.strMeal}</h2>

                  <p className="food-area">
                    🌎{" "}
                    {food.strArea ||
                      "International Cuisine"}
                  </p>

                  <div className="food-actions">
                    <Link
                      to={`/food/${food.idMeal}`}
                      className="details-btn"
                    >
                      View Recipe →
                    </Link>

                    <button
                      className="favorite-btn"
                      onClick={() =>
                        removeFavorite(food.idMeal)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </>
      )}
    </main>
  );
}

export default Favorites;