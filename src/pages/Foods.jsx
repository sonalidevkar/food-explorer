import { useState } from "react";
import "./Foods.css";

const foods = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Italian",
    emoji: "🍕",
    description: "Classic pizza with tomato, mozzarella and fresh basil.",
    time: "30 min",
    video: "https://www.youtube.com/results?search_query=margherita+pizza+recipe"
  },
  {
    id: 2,
    name: "Chicken Burger",
    category: "American",
    emoji: "🍔",
    description: "Juicy chicken burger with fresh vegetables and sauce.",
    time: "25 min",
    video: "https://www.youtube.com/results?search_query=chicken+burger+recipe"
  },
  {
    id: 3,
    name: "Creamy Pasta",
    category: "Italian",
    emoji: "🍝",
    description: "Creamy and delicious pasta prepared with herbs and cheese.",
    time: "20 min",
    video: "https://www.youtube.com/results?search_query=creamy+pasta+recipe"
  },
  {
    id: 4,
    name: "Chicken Biryani",
    category: "Indian",
    emoji: "🍛",
    description: "Aromatic basmati rice cooked with spicy chicken and herbs.",
    time: "45 min",
    video: "https://www.youtube.com/results?search_query=chicken+biryani+recipe"
  },
  {
    id: 5,
    name: "Sushi",
    category: "Japanese",
    emoji: "🍣",
    description: "Fresh and colorful Japanese sushi rolls.",
    time: "35 min",
    video: "https://www.youtube.com/results?search_query=sushi+recipe"
  },
  {
    id: 6,
    name: "Paneer Tikka",
    category: "Indian",
    emoji: "🧀",
    description: "Grilled paneer marinated with yogurt and Indian spices.",
    time: "30 min",
    video: "https://www.youtube.com/results?search_query=paneer+tikka+recipe"
  },
  {
    id: 7,
    name: "Masala Dosa",
    category: "Indian",
    emoji: "🥞",
    description: "Crispy South Indian dosa filled with spicy potato masala.",
    time: "35 min",
    video: "https://www.youtube.com/results?search_query=masala+dosa+recipe"
  },
  {
    id: 8,
    name: "Tacos",
    category: "Mexican",
    emoji: "🌮",
    description: "Crunchy tacos filled with vegetables, cheese and spicy sauce.",
    time: "25 min",
    video: "https://www.youtube.com/results?search_query=tacos+recipe"
  }
];

function Foods() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favoriteFoods");
    return saved ? JSON.parse(saved) : [];
  });

  const categories = [
    "All",
    "Indian",
    "Italian",
    "American",
    "Japanese",
    "Mexican"
  ];

  const toggleFavorite = (food) => {
    let updatedFavorites;

    const alreadyFavorite = favorites.some(
      (item) => item.id === food.id
    );

    if (alreadyFavorite) {
      updatedFavorites = favorites.filter(
        (item) => item.id !== food.id
      );
    } else {
      updatedFavorites = [...favorites, food];
    }

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favoriteFoods",
      JSON.stringify(updatedFavorites)
    );
  };

  const filteredFoods = foods.filter((food) => {
    const matchesSearch =
      food.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || food.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="foods-page">

      <section className="foods-header">

        <div className="foods-title">

          <span>🍽️ DISCOVER</span>

          <h1>
            Explore Delicious
            <strong> Recipes</strong>
          </h1>

          <p>
            Find delicious recipes from different cuisines
            and discover your next favorite food.
          </p>

        </div>

        <div className="food-search">

          <span>🔎</span>

          <input
            type="text"
            placeholder="Search your favorite food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </section>


      <div className="food-categories">

        {categories.map((item) => (

          <button
            key={item}
            className={
              category === item
                ? "category-btn selected"
                : "category-btn"
            }
            onClick={() => setCategory(item)}
          >
            {item}
          </button>

        ))}

      </div>


      <section className="foods-grid">

        {filteredFoods.length > 0 ? (

          filteredFoods.map((food) => {

            const isFavorite = favorites.some(
              (item) => item.id === food.id
            );

            return (
              <article
                className="food-card"
                key={food.id}
              >

                <div className="food-image">

                  <span className="big-food">
                    {food.emoji}
                  </span>

                  <span className="food-category">
                    {food.category}
                  </span>

                </div>


                <div className="food-card-content">

                  <h2>{food.name}</h2>

                  <p>{food.description}</p>


                  <div className="food-meta">

                    <span>
                      ⏱️ {food.time}
                    </span>

                    <span>
                      ⭐ 4.8
                    </span>

                  </div>


                  <div className="food-actions">

                    <button
                      className={
                        isFavorite
                          ? "favorite-btn favorite-active"
                          : "favorite-btn"
                      }
                      onClick={() => toggleFavorite(food)}
                      title={
                        isFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      {isFavorite ? "❤️" : "♡"}
                    </button>

                    <a
                      href={food.video}
                      target="_blank"
                      rel="noreferrer"
                      className="video-btn"
                    >
                      ▶️ Watch Recipe
                    </a>

                  </div>

                </div>

              </article>
            );
          })

        ) : (

          <div className="no-food">

            <div>😔</div>

            <h2>No food found</h2>

            <p>
              Try searching for another recipe.
            </p>

          </div>

        )}

      </section>

    </main>
  );
}

export default Foods;