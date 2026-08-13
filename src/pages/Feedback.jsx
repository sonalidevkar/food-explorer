import { useState } from "react";

function Feedback() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.rating ||
      !formData.message
    ) {
      alert("Please complete all fields.");
      return;
    }

    const oldFeedback =
      JSON.parse(localStorage.getItem("feedback")) || [];

    const newFeedback = {
      ...formData,
      id: Date.now(),
    };

    localStorage.setItem(
      "feedback",
      JSON.stringify([...oldFeedback, newFeedback])
    );

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      rating: 0,
      message: "",
    });
  };

  return (
    <main className="feedback-page">
      <section className="feedback-container">
        {/* Left Side */}
        <div className="feedback-intro">
          <span className="hero-badge">
            💬 We Value Your Opinion
          </span>

          <h1>
            Tell us what you
            <span> think!</span>
          </h1>

          <p>
            Your feedback helps us make Food Explorer
            better, easier and more delicious for everyone.
          </p>

          <div className="feedback-highlights">
            <div className="feedback-highlight">
              <span>🍴</span>
              <div>
                <strong>Better Experience</strong>
                <p>Help us improve your food journey.</p>
              </div>
            </div>

            <div className="feedback-highlight">
              <span>⭐</span>
              <div>
                <strong>Your Opinion Matters</strong>
                <p>Every suggestion makes a difference.</p>
              </div>
            </div>

            <div className="feedback-highlight">
              <span>❤️</span>
              <div>
                <strong>Made With Love</strong>
                <p>Built for food lovers like you.</p>
              </div>
            </div>
          </div>

          <div className="feedback-food">
            <span>🍕</span>
            <span>🍔</span>
            <span>🍜</span>
            <span>🥗</span>
            <span>🍰</span>
          </div>
        </div>

        {/* Right Side */}
        <div className="feedback-card">
          {submitted ? (
            <div className="feedback-success">
              <div className="success-icon">🎉</div>

              <h2>Thank You!</h2>

              <p>
                Your feedback has been submitted
                successfully.
              </p>

              <button
                className="feedback-submit"
                onClick={() => setSubmitted(false)}
              >
                ✨ Give More Feedback
              </button>
            </div>
          ) : (
            <>
              <div className="feedback-card-header">
                <h2>Share Your Feedback</h2>
                <p>
                  It only takes a minute. We promise! 😊
                </p>
              </div>

              <form
                className="feedback-form"
                onSubmit={handleSubmit}
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      Your Name
                    </label>

                    <div className="input-wrapper">
                      <span>👤</span>

                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      Email Address
                    </label>

                    <div className="input-wrapper">
                      <span>✉️</span>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="form-group">
                  <label>Your Experience</label>

                  <div className="rating-box">
                    <p>
                      How would you rate Food Explorer?
                    </p>

                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          className={
                            star <= formData.rating
                              ? "star active"
                              : "star"
                          }
                          onClick={() =>
                            setFormData({
                              ...formData,
                              rating: star,
                            })
                          }
                          aria-label={`Rate ${star} stars`}
                        >
                          ★
                        </button>
                      ))}
                    </div>

                    <span className="rating-text">
                      {formData.rating === 0
                        ? "Select a rating"
                        : `${formData.rating}/5 — ${
                            formData.rating === 5
                              ? "Excellent!"
                              : formData.rating === 4
                              ? "Great!"
                              : formData.rating === 3
                              ? "Good"
                              : formData.rating === 2
                              ? "Needs improvement"
                              : "We'll do better"}
                            `}
                    </span>
                  </div>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="message">
                    Your Message
                  </label>

                  <div className="textarea-wrapper">
                    <span>💭</span>

                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      placeholder="Tell us what you liked or what we can improve..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="feedback-submit"
                >
                  Send Feedback
                  <span>→</span>
                </button>

                <p className="privacy-note">
                  🔒 Your feedback is safely stored in this
                  browser.
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default Feedback;