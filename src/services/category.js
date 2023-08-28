import { service } from ".";

export default {
  getAll: (data) => service.post("/categorys/filter", data),
  create: (data) => service.post("/categorys", data),
  edit: (id, data) => service.put(`/categorys/${id}`, data),
  delete: (id) => service.delete(`/categorys/${id}`),
  getOne: (id) => service.get(`/categorys/${id}`),
};
