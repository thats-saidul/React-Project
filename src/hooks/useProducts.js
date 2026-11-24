import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../api/productApi";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        setProducts(await getAllProducts());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const removeProduct = async (id) => {
    try {
      setError(null);
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return { products, loading, error, removeProduct };
}