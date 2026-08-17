import { useState } from "react";
import "./Favorites.css";

function Favorites() {

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favoriteFoods");
    return saved ? JSON.parse(saved) : [];
  });

  const removeFavorite = (id) => {

    const updatedFavorites = favorites.filter(
      (food) => food.id !== id
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favoriteFoods",
      JSON.stringify(updatedFavorites)
    );
  };

  return (
    <main className="favorites-page">

      <section className="favorites-header">

        <span>❤️ YOUR COLLECTION</span>

        <h1>
          Favorite <strong>Foods</strong>
        </h1>

        <p>
          Your favorite recipes are saved here.
        </p>

      </section>


      {favorites.length === 0 ? (

        <section className="empty-favorites">

          <div className="empty-heart">
            💔
          </div>

          <h2>No Favorite Foods Yet</h2>

          <p>
            Go to Food Explorer and click ❤️
            on any food you love.
          </p>

        </section>

      ) : (

        <section className="favorite-grid">

          {favorites.map((food) => (

            <article
              className="favorite-card"
              key={food.id}
            >

              <div className="favorite-food-image">

                <span>
                  {food.emoji}
                </span>

                <small>
                  {food.category}
                </small>

              </div>


              <div className="favorite-card-content">

                <h2>{food.name}</h2>

                <p>
                  {food.description}
                </p>

                <div className="favorite-meta">
                  ⏱️ {food.time}
                </div>


                <div className="favorite-actions">

                  <a
                    href={food.video}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ▶️ Recipe Video
                  </a>

                  <button
                    onClick={() =>
                      removeFavorite(food.id)
                    }
                  >
                    🗑️ Remove
                  </button>

                </div>

              </div>

            </article>

          ))}

        </section>

      )}

    </main>
  );
}

export default Favorites;