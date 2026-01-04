import api from "./api";

export default {
  async listar(filtros = {}) {
    const res = await api.get("/lancamentos", { params: filtros });
    return res.data;
  },

  async criar(dados) {
    const res = await api.post("/lancamentos", dados);
    return res.data;
  },

  async criarMultiplos(lista) {
    const res = await api.post("/lancamentos/multiplos", { lancamentos: lista });
    return res.data;
  },

  async checklist(mesAno, respostas) {
    const res = await api.post("/lancamentos/checklist", {
      mes_ano: mesAno,
      respostas
    });
    return res.data;
  },

  async duplicarMesAnterior(mesAtual) {
    const res = await api.post("/lancamentos/duplicar", { mesAtual });
    return res.data;
  }
};
