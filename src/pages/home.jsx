import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <main className="home-page">

      {/* HERO */}
      <section className="home-hero">

        <div className="hero-content">

          <div className="hero-badge">
            🍴 Welcome to Food Explorer
          </div>

          <h1>
            Discover Your
            <span> Favorite Food</span>
          </h1>

          <p>
            Explore delicious recipes, discover new flavors,
            save your favorite dishes and enjoy food from
            around the world.
          </p>

          <div className="hero-actions">
            <Link to="/foods" className="hero-primary-btn">
              🍕 Explore Foods
            </Link>

            <Link to="/favorites" className="hero-secondary-btn">
              ❤️ Favorite Foods
            </Link>
          </div>

          <div className="hero-info">

            <div>
              <strong>500+</strong>
              <span>Recipes</span>
            </div>

            <div>
              <strong>50+</strong>
              <span>Food Types</span>
            </div>

            <div>
              <strong>25+</strong>
              <span>Cuisines</span>
            </div>

          </div>

        </div>


        {/* FOOD VISUAL */}

        <div className="home-food-area">

          <div className="food-background-circle"></div>

          <div className="main-food">
            🍛
          </div>

          <div className="floating-food food-one">
            🍕
          </div>

          <div className="floating-food food-two">
            🍔
          </div>

          <div className="floating-food food-three">
            🍣
          </div>

          <div className="floating-food food-four">
            🍰
          </div>

          <div className="home-rating">
            ⭐ <strong>4.9</strong>
            <small>Food lovers rating</small>
          </div>

        </div>

      </section>


      {/* QUICK OPTIONS */}

      <section className="home-options">

        <div className="home-section-heading">
          <span>EXPLORE FOOD</span>

          <h2>
            Everything You Need
            <br />
            In One Place
          </h2>

          <p>
            Discover, save and share your favorite food.
          </p>
        </div>


        <div className="home-option-grid">

          <Link to="/foods" className="home-option-card">

            <div className="option-icon orange">
              🍕
            </div>

            <h3>Food Explorer</h3>

            <p>
              Discover different recipes and delicious
              dishes from around the world.
            </p>

            <span>
              Explore Now →
            </span>

          </Link>


          <Link to="/favorites" className="home-option-card">

            <div className="option-icon red">
              ❤️
            </div>

            <h3>Favorite Foods</h3>

            <p>
              Save the foods you love and easily
              find them whenever you want.
            </p>

            <span>
              View Favorites →
            </span>

          </Link>


          <Link to="/feedback" className="home-option-card">

            <div className="option-icon purple">
              💬
            </div>

            <h3>Give Feedback</h3>

            <p>
              Tell us what you think and share
              your Food Explorer experience.
            </p>

            <span>
              Give Feedback →
            </span>

          </Link>

        </div>

      </section>


      {/* BOTTOM CTA */}

      <section className="home-bottom">

        <div>

          <span>🍽️ YOUR FOOD JOURNEY STARTS HERE</span>

          <h2>
            Hungry for something delicious?
          </h2>

          <p>
            Let's explore something amazing today.
          </p>

        </div>

        <Link to="/foods" className="bottom-explore-btn">
          Start Exploring →
        </Link>

      </section>

    </main>
  );
}

export default Home;