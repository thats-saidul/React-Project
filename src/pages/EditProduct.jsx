import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import useApicall from "../hooks/useApicall";

function EditProduct() {
  const { productid } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  
  const getFunc = useApicall();
  const submitFunc = useApicall();

  useEffect(() => {
    getFunc.fetchData(`https://fakestoreapi.com/products/${productid}`, {
      method: "GET",
    });
  }, [productid]);

  useEffect(() => {
    if (getFunc.result) {
      setFormData({
        title: getFunc.result.title,
        price: Math.round(getFunc.result.price),
        description: getFunc.result.description,
        image: getFunc.result.image,
        category: getFunc.result.category,
      });
    }
  }, [getFunc.result]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formData, price: parseInt(formData.price, 10) };
    submitFunc.fetchData(`https://fakestoreapi.com/products/${productid}`, { method: "PUT", body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } })
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  if (getFunc.error) {
    return (
      <div className="p-6 text-center">
        <p className="text-xl text-red-500">Error: {getFunc.error}</p>
        <Link to="/" className="inline-block mt-4 text-blue-600 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  if (getFunc.loading || !getFunc.result) {
    return <div className="p-6 text-center text-xl text-black">Loading...</div>;
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
            disabled={submitFunc.loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitFunc.loading ? "Saving..." : "Update Product"}
          </button>
        </form>

        {submitFunc.error && (
          <p className="mt-4 text-red-500">Error: {submitFunc.error}</p>
        )}

        {submitFunc.result && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
            <p className="font-medium">Product updated successfully!</p>
            <p>Product ID: {submitFunc.result.id}</p>
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