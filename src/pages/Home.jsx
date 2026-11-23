import { useEffect, useState } from "react";
import { Link } from "react-router";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Show a loading message while data is being fetched
  if (loading) {
    return (
      <div className="p-6 text-center text-xl text-white">Loading...</div>
    );
  }

  // Show an error message if the request failed
  if (error) {
    return (
      <div className="p-6 text-center text-xl text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Product List</h1>

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
                {/* Product image */}
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-contain rounded-lg"
                  />
                </td>

                {/* Product title */}
                <td className="p-4 font-medium">{product.title}</td>

                {/* Category */}
                <td className="p-4">{product.category}</td>

                {/* Price */}
                <td className="p-4">${product.price}</td>

                {/* Rating */}
                <td className="p-4">
                  {product.rating?.rate} ({product.rating?.count})
                </td>

                {/* Link to the details page */}
                <td>
                  <Link
                    to={`/product/${product.id}`}
                    className="text-blue-600 hover:underline p-4"
                  >
                    View Details
                  </Link>
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