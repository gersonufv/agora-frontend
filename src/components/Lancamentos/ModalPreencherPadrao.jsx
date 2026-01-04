import { useEffect, useState } from "react";
import variavelService from "../../services/variavelService";
import lancamentoService from "../../services/lancamentoService";

export default function ModalPreencherPadrao({ mesAtual, onClose, onConcluido }) {
  const [variaveis, setVariaveis] = useState([]);
  const [valores, setValores] = useState({});

  useEffect(() => {
    async function carregar() {
      const vars = await variavelService.listar();
      setVariaveis(vars);

      const inicial = {};
      vars.forEach((v) => (inicial[v.id] = ""));
      setValores(inicial);
    }
    carregar();
  }, []);

  function atualizarValor(id, valor) {
    setValores({ ...valores, [id]: valor });
  }

  async function enviar() {
    const lista = variaveis
      .filter((v) => valores[v.id] !== "" && valores[v.id] !== null)
      .map((v) => ({
        variavel_id: v.id,
        data_referencia: `${mesAtual}-01`,
        valor: Number(valores[v.id]),
        tipo_entrada: "PADRAO"
      }));

    if (lista.length === 0) {
      alert("Nenhum valor informado.");
      return;
    }

    await lancamentoService.criarMultiplos(lista);

    onConcluido();
  }

  return (
    <div>
      <h3>Preencher valores padrão</h3>

      <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "20px" }}>
        {variaveis.map((v) => (
          <div key={v.id} style={{ marginBottom: "10px" }}>
            <label>{v.nome}:</label>
            <input
              type="number"
              value={valores[v.id]}
              onChange={(e) => atualizarValor(v.id, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button onClick={enviar} style={{ marginRight: "10px" }}>
        Gerar lançamentos
      </button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
}
