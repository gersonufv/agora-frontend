import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";

import Dashboard from "./pages/Dashboard";
import Categorias from "./pages/Categorias";
import Variaveis from "./pages/Variaveis";
import Lancamentos from "./pages/Lancamentos";
import Estatisticas from "./pages/Estatisticas";
import Alertas from "./pages/Alertas";
import Configuracoes from "./pages/Configuracoes";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/variaveis" element={<Variaveis />} />
          <Route path="/lancamentos" element={<Lancamentos />} />
          <Route path="/estatisticas" element={<Estatisticas />} />
          <Route path="/alertas" element={<Alertas />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
