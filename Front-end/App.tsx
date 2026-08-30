import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  async function loadProducts() {
    const res = await fetch("http://localhost:5000/products");
    const data = await res.json();
    setProducts(data);
  }

  async function addProduct() {
    await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, quantity: Number(quantity), price: Number(price) })
    });

    setName("");
    setQuantity("");
    setPrice("");
    loadProducts();
  }

  async function deleteProduct(id: number) {
    await fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE"
    });

    loadProducts();
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="container">
      <h1>Controle de Estoque</h1>

      <div className="field">
        <label>Nome:</label>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Quantidade:</label>
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Preço:</label>
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      </div>

      <button onClick={addProduct}>Adicionar</button>

      {products.map(p => (
        <div key={p.id} className="product">
          <span>
            <strong>Nome:</strong> {p.name} &nbsp;|&nbsp; <strong>Quantidade:</strong> {p.quantity} &nbsp;|&nbsp; <strong>Preço:</strong> R$ {p.price.toFixed(2)}
          </span>
          <button onClick={() => deleteProduct(p.id)}>
            Remover
          </button>
        </div>
      ))}
    </div>
  );
}