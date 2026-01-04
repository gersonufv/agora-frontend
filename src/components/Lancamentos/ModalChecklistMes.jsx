import { useState } from "react";
import lancamentoService from "../../services/lancamentoService";

export default function ModalChecklistMes({ mesAtual, onClose, onConcluido }) {
  const [salario, setSalario] = useState("");
  const [freelance, setFreelance] = useState("");
  const [dividendos, setDividendos] = useState("");
  const [eventuais, setEventuais] = useState("");

  async function enviar() {
    const respostas = {
      salario: Number(salario) || 0,
      freelance: Number(freelance) || 0,
      dividendos: Number(dividendos) || 0,
      eventuais: Number(eventuais) || 0
    };

    await lancamentoService.checklist(mesAtual, respostas);

    onConcluido();
  }

  return (
    <div>
      <h3>Checklist do mês</h3>

      <div style={{ marginBottom: "10px" }}>
        <label>Salário:</label>
        <input type="number" value={salario} onChange={(e) => setSalario(e.target.value)} />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Freelance:</label>
        <input type="number" value={freelance} onChange={(e) => setFreelance(e.target.value)} />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Dividendos:</label>
        <input type="number" value={dividendos} onChange={(e) => setDividendos(e.target.value)} />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Eventuais:</label>
        <input type="number" value={eventuais} onChange={(e) => setEventuais(e.target.value)} />
      </div>

      <button onClick={enviar} style={{ marginRight: "10px" }}>
        Gerar lançamentos
      </button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
}
