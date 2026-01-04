import { useEffect, useState } from "react";
import lancamentoService from "../services/lancamentoService";
import categoriaService from "../services/categoriaService";
import variavelService from "../services/variavelService";
import Modal from "../components/Shared/Modal";
import FormAdicionarLancamento from "../components/Lancamentos/FormAdicionarLancamento";
import ModalDuplicarMes from "../components/Lancamentos/ModalDuplicarMes";
import ModalChecklistMes from "../components/Lancamentos/ModalChecklistMes";
import ModalPreencherPadrao from "../components/Lancamentos/ModalPreencherPadrao";
import ModalImportarPlanilha from "../components/Lancamentos/ModalImportarPlanilha";

export default function LancamentosMes() {
  const [mesAno, setMesAno] = useState(() => {
    const hoje = new Date();
    return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`;
  });

  const [lancamentos, setLancamentos] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [modalAdicionar, setModalAdicionar] = useState(false);
  const [modalDuplicar, setModalDuplicar] = useState(false);
  const [modalChecklist, setModalChecklist] = useState(false);
  const [modalPadrao, setModalPadrao] = useState(false);
  const [modalImportar, setModalImportar] = useState(false);

  async function carregarLancamentos() {
    try {
      setCarregando(true);
      const dados = await lancamentoService.listar({ mes_ano: mesAno });
      setLancamentos(dados);
    } catch (err) {
      console.error("Erro ao carregar lançamentos:", err);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarLancamentos();
  }, [mesAno]);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <h2>Lançamentos do Mês</h2>

      {/* Seletor de mês */}
      <div style={{ marginBottom: "20px" }}>
        <label>Mês/Ano: </label>
        <input
          type="month"
          value={mesAno}
          onChange={(e) => setMesAno(e.target.value)}
        />
      </div>

      {/* Botões de ação */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
        <button onClick={() => setModalAdicionar(true)}>➕ Adicionar</button>
        <button onClick={() => alert("Duplicar mês anterior")}>🔁 Duplicar mês anterior</button>
        <button onClick={() => alert("Preencher valores padrão")}>⭐ Preencher padrão</button>
        <button onClick={() => alert("Checklist do mês")}>📝 Checklist</button>
        <button onClick={() => alert("Importar planilha")}>📄 Importar planilha</button>
        <button onClick={() => setModalDuplicar(true)}>🔁 Duplicar mês anterior</button>
        <button onClick={() => setModalAdicionar(true)}>➕ Adicionar</button>
        <button onClick={() => setModalDuplicar(true)}>🔁 Duplicar mês anterior</button>
        <button onClick={() => setModalPadrao(true)}>⭐ Preencher padrão</button>
        <button onClick={() => setModalChecklist(true)}>📝 Checklist do mês</button>
        <button onClick={() => setModalImportar(true)}>📄 Importar planilha</button>
      </div>

      {/* Lista de lançamentos */}
      {carregando ? (
        <p>Carregando...</p>
      ) : lancamentos.length === 0 ? (
        <p>Nenhum lançamento encontrado para {mesAno}.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Categoria</th>
              <th>Variável</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {lancamentos.map((l) => (
              <tr key={l.id}>
                <td>{new Date(l.data_referencia).toLocaleDateString("pt-BR")}</td>
                <td>{l.VariavelFinanceira?.Categoria?.nome}</td>
                <td>{l.VariavelFinanceira?.nome}</td>
                <td>R$ {Number(l.valor).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal dentro do container */}
      <Modal open={modalAdicionar} onClose={() => setModalAdicionar(false)}>
        <FormAdicionarLancamento
          mesAno={mesAno}
          onSalvo={() => {
            setModalAdicionar(false);
            carregarLancamentos();
          }}
        />
      </Modal>
    
      <Modal open={modalDuplicar} onClose={() => setModalDuplicar(false)}>
        <ModalDuplicarMes
          mesAtual={mesAno}
          onClose={() => setModalDuplicar(false)}
          onDuplicado={() => {
            setModalDuplicar(false);
            carregarLancamentos();
          }}
        />
      </Modal>

<Modal open={modalChecklist} onClose={() => setModalChecklist(false)}>
  <ModalChecklistMes
    mesAtual={mesAno}
    onClose={() => setModalChecklist(false)}
    onConcluido={() => {
      setModalChecklist(false);
      carregarLancamentos();
    }}
  />
</Modal>

<Modal open={modalPadrao} onClose={() => setModalPadrao(false)}>
  <ModalPreencherPadrao
    mesAtual={mesAno}
    onClose={() => setModalPadrao(false)}
    onConcluido={() => {
      setModalPadrao(false);
      carregarLancamentos();
    }}
  />
</Modal>

<Modal open={modalImportar} onClose={() => setModalImportar(false)}>
  <ModalImportarPlanilha
    mesAtual={mesAno}
    onClose={() => setModalImportar(false)}
    onImportado={() => {
      setModalImportar(false);
      carregarLancamentos();
    }}
  />
</Modal>
      
    </div>
  );
}
