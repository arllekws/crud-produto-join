import { api } from "../api";
import type { Product, ProductInput } from "../../@types/types";

export const productService = {
  async list(q?: string): Promise<Product[]> {
  const { data } = await api.get("/products", { params: { q } });
  return Array.isArray(data) ? data : data?.content ?? [];
},

  async create(payload: ProductInput) {
    return api.post("/products", payload);
  },

  async update(id: number, payload: ProductInput) {
    return api.put(`/products/${id}`, payload);
  },

  async remove(id: number) {
    return api.delete(`/products/${id}`);
  },
};
