import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside style={{ width: "220px", padding: "16px", background: "#f3f4f6" }}>
      <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Link to="/">Dashboard</Link>
        <Link to="/categorias">Categorias</Link>
        <Link to="/variaveis">Variáveis</Link>
        <Link to="/lancamentos">Lançamentos</Link>
        <Link to="/estatisticas">Estatísticas</Link>
        <Link to="/alertas">Alertas</Link>
        <Link to="/configuracoes">Configurações</Link>
      </nav>
    </aside>
  );
}
