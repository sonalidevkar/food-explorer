import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application Error:", error);
    console.error("Error Details:", errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main
          style={{
            textAlign: "center",
            padding: "60px 20px",
          }}
        >
          <h1>Something went wrong 😔</h1>

          <p>
            We couldn't display this page correctly.
            Please try again.
          </p>

          <button onClick={this.handleReload}>
            Reload Page
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;