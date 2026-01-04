import { useState } from "react";
import api from "../../services/api";

export default function ModalImportarPlanilha({ mesAtual, onClose, onImportado }) {
  const [arquivo, setArquivo] = useState(null);

  async function enviar() {
    if (!arquivo) {
      alert("Selecione um arquivo .xlsx");
      return;
    }

    const form = new FormData();
    form.append("arquivo", arquivo);
    form.append("mes_ano", mesAtual);

    await api.post("/importacao", form, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    onImportado();
  }

  return (
    <div>
      <h3>Importar planilha</h3>

      <input type="file" accept=".xlsx" onChange={(e) => setArquivo(e.target.files[0])} />

      <div style={{ marginTop: "20px" }}>
        <button onClick={enviar} style={{ marginRight: "10px" }}>
          Importar
        </button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}
