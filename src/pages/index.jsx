import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">🍴 Discover • Cook • Enjoy</span>

          <h1>
            Discover Your
            <span> Favorite Food</span>
          </h1>

          <p>
            Explore delicious recipes from around the world.
            Find your next favorite meal with Food Explorer.
          </p>

          <div className="hero-buttons">
            <Link to="/foods" className="primary-btn">
              Explore Recipes 🍔
            </Link>

            <Link to="/favorites" className="secondary-btn">
              My Favorites ❤️
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <div className="food-circle">
            🍕
          </div>

          <div className="floating-card card-one">
            🍔 Delicious
          </div>

          <div className="floating-card card-two">
            ⭐ 4.9 Rating
          </div>

          <div className="floating-card card-three">
            ❤️ Loved Recipes
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🌎</div>
          <h2>Global Recipes</h2>
          <p>
            Discover recipes and cuisines from different
            parts of the world.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h2>Easy Search</h2>
          <p>
            Quickly search for your favorite food and
            discover new recipes.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">❤️</div>
          <h2>Save Favorites</h2>
          <p>
            Save recipes you love and access them anytime.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;