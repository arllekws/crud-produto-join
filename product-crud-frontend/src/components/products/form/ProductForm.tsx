import { useEffect, useState } from "react";
import type { Product, ProductInput } from "../../../@types/types";
import styles from "./ProductForm.module.css";

interface Props {
  editing?: Product | null;
  // permitir onSubmit síncrono OU assíncrono
  onSubmit: (id: number | null, payload: ProductInput) => Promise<void> | void;
  onCancel: () => void;
}

type FormState = {
  id: number | null;
  name: string;
  price: string;
  quantity: string;
  description: string;
};

const INITIAL: FormState = { id: null, name: "", price: "", quantity: "", description: "" };

export default function ProductForm({ editing, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        id: editing.id ?? null,
        name: editing.name ?? "",
        price: String(editing.price ?? ""),
        quantity: String(editing.quantity ?? ""),
        description: editing.description ?? "",
      });
    } else {
      setForm(INITIAL); // limpa quando sai do modo edição
    }
  }, [editing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const payload: ProductInput = {
      name: form.name.trim(),
      price: Number(form.price),
      quantity: Number(form.quantity),
      description: form.description.trim() || undefined,
    };

    try {
      setSubmitting(true);
      await onSubmit(form.id, payload); // suporta Promise ou void
      setForm(INITIAL);                 // 🔹 LIMPA AQUI, após cadastrar/atualizar
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.fullRow}>
        <label className={styles.label}>Nome</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nome do produto"
          required
          className={styles.input}
          disabled={submitting}
        />
      </div>

      <div className={styles.labelGroup}>
        <label className={styles.label}>Preço</label>
        <input
          name="price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          placeholder="0.00"
          required
          min={0}
          className={styles.input}
          disabled={submitting}
        />

        <label className={styles.label}>Quantidade</label>
        <input
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          min={0}
          required
          className={styles.input}
          disabled={submitting}
        />
      </div>

      <div className={styles.fullRow}>
        <label className={styles.label}>Descrição</label>
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descrição opcional"
          className={styles.input}
          disabled={submitting}
        />
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.buttonPrimary} disabled={submitting}>
          {submitting ? "Salvando..." : form.id ? "Atualizar" : "Cadastrar"}
        </button>

        {form.id && (
          <button type="button" onClick={onCancel} className={styles.buttonGhost} disabled={submitting}>
            Cancelar edição
          </button>
        )}
      </div>
    </form>
  );
}
