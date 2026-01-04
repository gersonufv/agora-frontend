import api from "./api";

export default {
  async listar() {
    const res = await api.get("/categorias");
    return res.data;
  },

  async criar(dados) {
    const res = await api.post("/categorias", dados);
    return res.data;
  },

  async atualizar(id, dados) {
    const res = await api.put(`/categorias/${id}`, dados);
    return res.data;
  },

  async deletar(id) {
    const res = await api.delete(`/categorias/${id}`);
    return res.data;
  }
};
