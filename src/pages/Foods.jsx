import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Foods() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    } catch {
      return [];
    }
  });

  // Keeps track of the current API request
  const controllerRef = useRef(null);

  const fetchFoods = async (query = "") => {
    // Cancel previous request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
          query
        )}`,
        {
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch foods");
      }

      const data = await response.json();

      setFoods(data.meals || []);
    } catch (err) {
      if (err.name === "AbortError") {
        return;
      }

      setError("Unable to load foods. Please try again.");
      setFoods([]);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  };

  // Load foods when page opens
  useEffect(() => {
    fetchFoods("");

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  // Search
  const handleSearch = (event) => {
    event.preventDefault();

    fetchFoods(search.trim());
  };

  // Clear search
  const handleClearSearch = () => {
    setSearch("");
    fetchFoods("");
  };

  // Favorite toggle
  const toggleFavorite = (food) => {
    const alreadyFavorite = favorites.some(
      (item) => item.idMeal === food.idMeal
    );

    const updatedFavorites = alreadyFavorite
      ? favorites.filter((item) => item.idMeal !== food.idMeal)
      : [...favorites, food];

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  return (
    <main className="foods-page">
      {/* Page Header */}
      <section className="foods-header">
        <div>
          <span className="hero-badge">
            🍴 Explore • Discover • Enjoy
          </span>

          <h1>
            Explore Delicious <span>Foods 🍕</span>
          </h1>

          <p>
            Discover amazing recipes from different cuisines
            around the world.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <form
          className="food-search-form"
          onSubmit={handleSearch}
        >
          <label htmlFor="food-search">
            Search for a food
          </label>

          <div className="search-box">
            <span className="search-icon">🔍</span>

            <input
              id="food-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search Chicken, Pasta, Pizza..."
              autoComplete="off"
            />

            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}

            <button
              type="submit"
              className="search-button"
              disabled={loading}
            >
              Search
            </button>
          </div>
        </form>
      </section>

      {/* Loading */}
      {loading && (
        <section
          className="status-section"
          aria-live="polite"
        >
          <div className="loader"></div>

          <h2>Finding delicious foods...</h2>

          <p>Please wait a moment 🍔</p>
        </section>
      )}

      {/* Error */}
      {!loading && error && (
        <section
          className="status-section error-section"
          role="alert"
        >
          <div className="status-icon">😔</div>

          <h2>Oops! Something went wrong.</h2>

          <p>{error}</p>

          <button
            className="retry-button"
            onClick={() => fetchFoods(search)}
          >
            🔄 Try Again
          </button>
        </section>
      )}

      {/* Empty */}
      {!loading && !error && foods.length === 0 && (
        <section className="status-section">
          <div className="status-icon">🍽️</div>

          <h2>No foods found</h2>

          <p>
            We couldn't find that recipe. Try another food
            name.
          </p>

          <button
            className="retry-button"
            onClick={handleClearSearch}
          >
            View All Foods
          </button>
        </section>
      )}

      {/* Results */}
      {!loading && !error && foods.length > 0 && (
        <section className="food-results">
          <div className="results-heading">
            <div>
              <h2>
                {search
                  ? `Results for "${search}"`
                  : "Popular Recipes"}
              </h2>

              <p>
                {foods.length} recipe
                {foods.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="results-count">
              🍴 {foods.length}
            </div>
          </div>

          <div className="food-grid">
            {foods.map((food) => {
              const isFavorite = favorites.some(
                (item) => item.idMeal === food.idMeal
              );

              return (
                <article
                  className="food-card"
                  key={food.idMeal}
                >
                  {/* Food Image */}
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
                      type="button"
                      onClick={() => toggleFavorite(food)}
                      aria-label={
                        isFavorite
                          ? `Remove ${food.strMeal} from favorites`
                          : `Add ${food.strMeal} to favorites`
                      }
                    >
                      {isFavorite ? "❤️" : "🤍"}
                    </button>
                  </div>

                  {/* Food Information */}
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
                        type="button"
                        onClick={() => toggleFavorite(food)}
                      >
                        {isFavorite
                          ? "Saved ❤️"
                          : "Save 🤍"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}

export default Foods;