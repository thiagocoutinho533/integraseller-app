export default function DashboardPage() {
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>IntegraSeller</h2>

        <nav style={styles.nav}>
          <a style={styles.navItem} href="#">
            📦 Pedidos
          </a>
          <a style={styles.navItem} href="#">
            🛒 Produtos
          </a>
          <a style={styles.navItem} href="#">
            🤝 Integrações
          </a>
          <a style={styles.navItem} href="#">
            ⚙️ Configurações
          </a>
        </nav>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Sair
        </button>
      </aside>

      <main style={styles.main}>
        <h1 style={styles.h1}>Dashboard</h1>
        <p style={styles.p}>
          Bem-vindo! Aqui vai ficar o resumo de pedidos, estoque,
          integração com marketplace etc.
        </p>

        <div style={styles.cardsGrid}>
          <div style={styles.card}>
            <div style={styles.cardLabel}>Pedidos hoje</div>
            <div style={styles.cardValue}>12</div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardLabel}>Faturamento hoje</div>
            <div style={styles.cardValue}>R$ 1.234,50</div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardLabel}>Produtos ativos</div>
            <div style={styles.cardValue}>248</div>
          </div>

          <div style={styles.card}>
            <div style={styles.cardLabel}>Anomalias</div>
            <div style={{ ...styles.cardValue, color: "#dc2626" }}>3</div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f1f5f9",
    display: "flex",
    color: "#0f172a",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
  },
  sidebar: {
    width: 240,
    backgroundColor: "#1e293b",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "1.5rem",
    gap: "1.5rem",
  },
  logo: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: "#fff",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    flexGrow: 1,
  },
  navItem: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: "0.95rem",
    backgroundColor: "#334155",
    padding: "0.6rem 0.75rem",
    borderRadius: 6,
    display: "block",
  },
  logoutBtn: {
    backgroundColor: "#ef4444",
    border: "none",
    borderRadius: 6,
    color: "#fff",
    padding: "0.6rem 0.75rem",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "0.9rem",
  },
  main: {
    flexGrow: 1,
    padding: "2rem",
  },
  h1: {
    fontSize: "1.4rem",
    fontWeight: 600,
    marginBottom: "0.5rem",
    color: "#0f172a",
  },
  p: {
    fontSize: "0.95rem",
    color: "#475569",
    marginBottom: "2rem",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "1rem",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    border: "1px solid #e2e8f0",
    padding: "1rem",
    boxShadow:
      "0 20px 25px -5px rgba(0,0,0,0.05),0 10px 10px -5px rgba(0,0,0,0.03)",
  },
  cardLabel: {
    fontSize: "0.8rem",
    color: "#64748b",
    marginBottom: "0.35rem",
    fontWeight: 500,
  },
  cardValue: {
    fontSize: "1.4rem",
    fontWeight: 600,
    color: "#0f172a",
  },
};
