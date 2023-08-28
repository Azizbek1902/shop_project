import { service } from ".";

export default {
  getAll: (data) => service.post("/products/filter", data),
  create: (data) => service.post("/products", data),
  edit: (id, data) => service.put(`/products/${id}`, data),
  delete: (id) => service.delete(`/products/${id}`),
  getOne: (id) => service.get(`/products/${id}`),
};
