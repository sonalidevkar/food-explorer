import { useState } from "react";
import "./Feedback.css";

function Feedback() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem("foodFeedbacks");
    return saved ? JSON.parse(saved) : [];
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || rating === 0 || !message.trim()) {
      alert("Please complete all fields.");
      return;
    }

    const newFeedback = {
      id: Date.now(),
      name: name.trim(),
      rating,
      message: message.trim()
    };

    const updatedFeedbacks = [
      newFeedback,
      ...feedbacks
    ];

    setFeedbacks(updatedFeedbacks);

    localStorage.setItem(
      "foodFeedbacks",
      JSON.stringify(updatedFeedbacks)
    );

    setName("");
    setRating(0);
    setMessage("");
  };

  return (
    <main className="feedback-page">

      {/* HEADER */}

      <section className="feedback-header">

        <span>💬 SHARE YOUR EXPERIENCE</span>

        <h1>
          We Value Your
          <strong> Feedback</strong>
        </h1>

        <p>
          Tell us what you think about Food Explorer.
          Your feedback helps us make the experience better.
        </p>

      </section>


      {/* FORM */}

      <section className="feedback-container">

        <div className="feedback-form-card">

          <div className="feedback-icon">
            💬
          </div>

          <h2>Give Your Feedback</h2>

          <p className="form-subtitle">
            We'd love to hear from you!
          </p>

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <label>Your Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />


            {/* RATING */}

            <label>How was your experience?</label>

            <div className="rating-input">

              {[1, 2, 3, 4, 5].map((star) => (

                <button
                  type="button"
                  key={star}
                  className={
                    star <= rating
                      ? "star selected-star"
                      : "star"
                  }
                  onClick={() => setRating(star)}
                >
                  ★
                </button>

              ))}

            </div>


            {/* MESSAGE */}

            <label>Your Feedback</label>

            <textarea
              placeholder="Write your feedback here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
            ></textarea>


            <button
              type="submit"
              className="submit-feedback"
            >
              Send Feedback 🚀
            </button>

          </form>

        </div>


        {/* SIDE INFO */}

        <div className="feedback-side">

          <div className="feedback-side-card">

            <div className="big-feedback-emoji">
              ❤️
            </div>

            <h2>
              Your opinion matters!
            </h2>

            <p>
              Every piece of feedback helps us improve
              Food Explorer and create a better experience
              for everyone.
            </p>

            <div className="feedback-stats">

              <div>
                <strong>⭐ 4.9</strong>
                <span>Average Rating</span>
              </div>

              <div>
                <strong>❤️ 100%</strong>
                <span>Food Lovers</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FEEDBACK LIST */}

      <section className="feedback-list-section">

        <div className="feedback-list-title">

          <span>WHAT PEOPLE SAY</span>

          <h2>
            Latest Feedback
          </h2>

        </div>


        {feedbacks.length === 0 ? (

          <div className="no-feedback">

            <div>💭</div>

            <h3>No feedback yet</h3>

            <p>
              Be the first person to share your experience!
            </p>

          </div>

        ) : (

          <div className="feedback-grid">

            {feedbacks.map((item) => (

              <article
                className="feedback-card"
                key={item.id}
              >

                <div className="feedback-card-top">

                  <div className="user-avatar">
                    {item.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3>{item.name}</h3>

                    <div className="feedback-stars">
                      {"★".repeat(item.rating)}
                      <span>
                        {"★".repeat(5 - item.rating)}
                      </span>
                    </div>
                  </div>

                </div>

                <p>
                  "{item.message}"
                </p>

              </article>

            ))}

          </div>

        )}

      </section>

    </main>
  );
}

export default Feedback;