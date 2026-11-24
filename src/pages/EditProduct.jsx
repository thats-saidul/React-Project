import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getProductById, updateProduct } from "../api/productApi";

function EditProduct() {
  
  const { productid } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const [loading, setLoading] = useState(true); 
  const [saving, setSaving] = useState(false); 
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getProductById(productid);

        setFormData({
          title: data.title,
          price: data.price,
          description: data.description,
          image: data.image,
          category: data.category,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productid]);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
   
    e.preventDefault();

    try {
      setSaving(true);
      setError(null);
      setResult(null);

     
      const payload = { ...formData, price: parseInt(formData.price, 10) };

      const data = await updateProduct(productid, payload);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  if (loading) {
    return <div className="p-6 text-center text-xl text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          Edit Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              step="1"
              min="0"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Update Product"}
          </button>
        </form>

        
        {error && <p className="mt-4 text-red-500">Error: {error}</p>}

        
        {result && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
            <p className="font-medium">Product updated successfully!</p>
            <p>Product ID: {result.id}</p>
          </div>
        )}

        <Link to="/" className="inline-block mt-6 text-blue-600 underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default EditProduct;