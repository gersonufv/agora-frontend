import { useEffect, useState } from "react";
import lancamentoService from "../../services/lancamentoService";

export default function ModalDuplicarMes({ mesAtual, onClose, onDuplicado }) {
  const [lancamentosAnterior, setLancamentosAnterior] = useState([]);
  const [selecionados, setSelecionados] = useState([]);

  const mes = Number(mesAtual.split("-")[1]);
  const ano = Number(mesAtual.split("-")[0]);

  const mesAnterior = mes === 1 ? 12 : mes - 1;
  const anoAnterior = mes === 1 ? ano - 1 : ano;

  const mesAnoAnterior = `${anoAnterior}-${String(mesAnterior).padStart(2, "0")}`;

  useEffect(() => {
    async function carregar() {
      const dados = await lancamentoService.listar({ mes_ano: mesAnoAnterior });
      setLancamentosAnterior(dados);
      setSelecionados(dados.map((l) => l.id)); // marca tudo por padrão
    }
    carregar();
  }, []);

  function toggle(id) {
    if (selecionados.includes(id)) {
      setSelecionados(selecionados.filter((x) => x !== id));
    } else {
      setSelecionados([...selecionados, id]);
    }
  }

  async function duplicar() {
    const escolhidos = lancamentosAnterior.filter((l) =>
      selecionados.includes(l.id)
    );

    const novos = escolhidos.map((l) => ({
      variavel_id: l.variavel_id,
      data_referencia: `${mesAtual}-01`, // ajustamos depois se quiser
      valor: l.valor,
      tipo_entrada: "DUPLICADO"
    }));

    await lancamentoService.criarMultiplos(novos);

    onDuplicado();
  }

  return (
    <div>
      <h3>Duplicar do mês anterior ({mesAnoAnterior})</h3>

      {lancamentosAnterior.length === 0 ? (
        <p>Nenhum lançamento no mês anterior.</p>
      ) : (
        <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "20px" }}>
          {lancamentosAnterior.map((l) => (
            <label key={l.id} style={{ display: "block", marginBottom: "8px" }}>
              <input
                type="checkbox"
                checked={selecionados.includes(l.id)}
                onChange={() => toggle(l.id)}
              />
              {" "}
              {l.VariavelFinanceira?.Categoria?.nome} — {l.VariavelFinanceira?.nome} — R$ {Number(l.valor).toFixed(2)}
            </label>
          ))}
        </div>
      )}

      <button onClick={duplicar} style={{ marginRight: "10px" }}>
        Duplicar selecionados
      </button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  );
}
