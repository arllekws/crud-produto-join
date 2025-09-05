import type { Product } from "../../../@types/types";
import styles from "./ProductTable.module.css";

interface Props {
  items: Product[];
  loading: boolean;
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
  // 🔹 novos:
  query: string;
  setQuery: (v: string) => void;
}

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

export default function ProductTable({
  items,
  loading,
  onEdit,
  onDelete,
  query,
  setQuery,
}: Props) {
  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.wrapper}>
      {/* 🔎 Campo de busca */}
      <div className={styles.searchBar}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome…"
          aria-label="Buscar por nome"
          className={styles.searchInput}
        />
      </div>

      <table className={styles.table} role="table" aria-label="Tabela de produtos">
        <thead className={styles.thead}>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th className={styles.right}>Preço</th>
            <th className={styles.right}>Qtd</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {items.map((p) => (
            <tr key={p.id}>
              <td className={styles.cell}>{p.id}</td>
              <td className={styles.cell}>{p.name}</td>
              <td className={`${styles.cell} ${styles.right}`}>
                {currency.format(Number(p.price))}
              </td>
              <td className={`${styles.cell} ${styles.right}`}>{p.quantity}</td>
              <td className={styles.cell}>{p.description}</td>
              <td className={styles.cell}>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.primary}`}
                    onClick={() => onEdit(p)}
                    aria-label={`Editar ${p.name}`}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.ghost}`}
                    onClick={() => onDelete(p.id)}
                    aria-label={`Excluir ${p.name}`}
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {items.length === 0 && (
            <tr>
              <td className={`${styles.cell} ${styles.empty}`} colSpan={6}>
                Nenhum produto cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
