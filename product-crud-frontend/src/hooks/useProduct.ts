import { useState, useEffect } from "react";
import { productService } from "../service/product/productService";
import type { Product, ProductInput } from "../@types/types";

function useDebounce<T>(value: T, delay = 100) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [query, setQuery] = useState("");           // 🔹 novo

  const debouncedQuery = useDebounce(query, 300);   // 🔹 debounce

  const load = async (q?: string) => {
    setLoading(true);
    try {
      setProducts(await productService.list(q));
    } finally {
      setLoading(false);
    }
  };

  // carrega na montagem e sempre que a query (com debounce) mudar
  useEffect(() => {
    load(debouncedQuery);
  }, [debouncedQuery]);

  const submit = async (id: number | null, payload: ProductInput) => {
    if (id) await productService.update(id, payload);
    else await productService.create(payload);
    setEditing(null);
    await load(debouncedQuery); // mantém o filtro após salvar
  };

  const remove = async (id: number) => {
    if (confirm("Excluir este produto?")) {
      await productService.remove(id);
      await load(debouncedQuery); // mantém o filtro após excluir
    }
  };

  return { products, loading, editing, setEditing, submit, remove, query, setQuery };
}
