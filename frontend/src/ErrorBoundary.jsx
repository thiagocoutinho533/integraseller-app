import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { err: null };
  }

  static getDerivedStateFromError(error) {
    return { err: error };
  }

  componentDidCatch(error, info) {
    console.error("Erro capturado pela ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.err) {
      return (
        <div style={{ padding: 24, fontFamily: "system-ui" }}>
          <h1>⚠️ Erro no frontend</h1>
          <h3>{String(this.state.err.message || this.state.err)}</h3>
          <pre style={{ whiteSpace: "pre-wrap", background: "#f8f8f8", padding: 12 }}>
{String(this.state.err.stack || this.state.err)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
