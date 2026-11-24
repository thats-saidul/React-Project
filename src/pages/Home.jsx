import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getAllProducts, deleteProduct } from "../api/productApi";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
  // Ask the user before deleting
  const confirmed = window.confirm("Are you sure you want to delete this product?");
  if (!confirmed) return;

  try {
    setError(null);
    await deleteProduct(id);

    // Remove the deleted product from the list on screen
    setProducts((prev) => prev.filter((product) => product.id !== id));
  } catch (err) {
    setError(err.message);
  }
};

  
  if (loading) {
    return (
      <div className="p-6 text-center text-xl text-white">Loading...</div>
    );
  }

  
  if (error) {
    return (
      <div className="p-6 text-center text-xl text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-slate-800">Product List</h1>

      <Link
        to="/add-product"
        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
      >
        + Add Product
      </Link>
    </div>

    <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-4">Image</th>
            <th className="p-4">Title</th>
            <th className="p-4">Category</th>
            <th className="p-4">Price</th>
            <th className="p-4">Rating</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-100">
              
              <td className="p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-contain rounded-lg"
                />
              </td>
              <td className="p-4 font-medium">{product.title}</td>
              <td className="p-4">{product.category}</td>
              <td className="p-4">${product.price}</td>
              <td className="p-4">
                {product.rating?.rate} ({product.rating?.count})
              </td>

              <td className="p-4 space-x-4">
                <Link
                  to={`/product/${product.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View Details
                </Link>

                <Link
                  to={`/edit-product/${product.id}`}
                  className="text-yellow-600 hover:underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default Home;