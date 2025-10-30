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
    // log no console pra facilitar
    console.error("ErrorBoundary capturou:", error, info);
  }
  render() {
    if (this.state.err) {
      return (
        <div style={{ padding: 24, fontFamily: "system-ui" }}>
          <h1>⚠️ Erro no frontend</h1>
          <pre style={{ whiteSpace: "pre-wrap" }}>
{String(this.state.err && this.state.err.stack || this.state.err)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
