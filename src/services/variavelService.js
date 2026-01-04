import api from "./api";

export default {
  async listar() {
    const res = await api.get("/variaveis");
    return res.data;
  },

  async criar(dados) {
    const res = await api.post("/variaveis", dados);
    return res.data;
  },

  async atualizar(id, dados) {
    const res = await api.put(`/variaveis/${id}`, dados);
    return res.data;
  },

  async deletar(id) {
    const res = await api.delete(`/variaveis/${id}`);
    return res.data;
  }
};
