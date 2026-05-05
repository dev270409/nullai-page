import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error) {
    // Keep a console trace in production to debug blank-screen issues.
    // eslint-disable-next-line no-console
    console.error("[frontend-runtime-error]", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main style={{ minHeight: "100vh", background: "#000", color: "#fff", padding: "24px" }}>
          <h1 style={{ margin: 0, fontSize: "20px" }}>Something went wrong while loading the page.</h1>
          <p style={{ opacity: 0.8 }}>Please refresh the page. If the issue persists, contact support.</p>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
