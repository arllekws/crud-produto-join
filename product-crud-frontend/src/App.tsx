import ProductForm from "./components/products/form/ProductForm";
import ProductTable from "./components/products/table/ProductTable";
import { useProducts } from "./hooks/useProduct"; // confira o nome do arquivo

export default function App() {
  const { products, loading, editing, setEditing, submit, remove, query, setQuery } =
    useProducts();

  return (
    <div style={{ margin: "2rem auto", maxWidth: 900, fontFamily: "system-ui" }}>
      <h1>Produtos Join</h1>

      <ProductForm
        editing={editing ?? undefined}
        onSubmit={submit}
        onCancel={() => setEditing(null)}
      />

      <ProductTable
        items={products}
        loading={loading}
        onEdit={setEditing}
        onDelete={remove}
        query={query}          // 🔹 passa o estado
        setQuery={setQuery}    // 🔹 passa o setter (o hook já faz debounce+fetch)
      />
    </div>
  );
}
