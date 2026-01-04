import { useEffect, useState } from "react";
import categoriaService from "../../services/categoriaService";
import variavelService from "../../services/variavelService";
import lancamentoService from "../../services/lancamentoService";

export default function FormAdicionarLancamento({ mesAno, onSalvo }) {
  const [categorias, setCategorias] = useState([]);
  const [variaveis, setVariaveis] = useState([]);

  const [categoriaId, setCategoriaId] = useState("");
  const [variavelId, setVariavelId] = useState("");
  const [data, setData] = useState("");
  const [valor, setValor] = useState("");

  useEffect(() => {
    async function carregar() {
      const cats = await categoriaService.listar();
      setCategorias(cats);
    }
    carregar();
  }, []);

  async function carregarVariaveisDaCategoria(id) {
    const todas = await variavelService.listar();
    const filtradas = todas.filter((v) => v.categoria_id === id);
    setVariaveis(filtradas);
  }

  async function salvar() {
    if (!variavelId || !data || !valor) {
      alert("Preencha todos os campos");
      return;
    }

    await lancamentoService.criar({
      variavel_id: variavelId,
      data_referencia: data,
      valor: Number(valor),
      tipo_entrada: "MANUAL"
    });

    onSalvo();
  }

  return (
    <div>
      <h3>Adicionar Lançamento</h3>

      <div style={{ marginBottom: "10px" }}>
        <label>Categoria:</label>
        <select
          value={categoriaId}
          onChange={(e) => {
            setCategoriaId(e.target.value);
            carregarVariaveisDaCategoria(e.target.value);
          }}
        >
          <option value="">Selecione</option>
          {categorias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Variável:</label>
        <select
          value={variavelId}
          onChange={(e) => setVariavelId(e.target.value)}
        >
          <option value="">Selecione</option>
          {variaveis.map((v) => (
            <option key={v.id} value={v.id}>
              {v.nome}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Data:</label>
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Valor:</label>
        <input
          type="number"
          step="0.01"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </div>

      <button onClick={salvar}>Salvar</button>
    </div>
  );
}
