import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { getProductById } from "../api/productApi";

const ProductDetails = () => {
    const { productid } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

            
                const data = await getProductById(productid);
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
            };
        fetchProduct();
    }, [productid]);

    
    if (loading) {
        return <div className="p-6 text-center text-xl">Loading...</div>;
    }

    
    if (error || !product) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold text-red-500">
                    Product Not Found!
                </h1>

                <Link
                    to="/"
                    className="text-blue-500 underline mt-4 inline-block"
                >
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-6">
                    Product Details
                </h1>

                <div className="flex flex-col md:flex-row gap-8">
                    
                    <div className="md:w-1/2">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-72 object-contain rounded-lg"
                        />
                    </div>

                    
                    <div className="md:w-1/2 space-y-4">
                        <h2 className="text-2xl font-bold text-slate-800">
                            {product.title}
                        </h2>

                        <p className="text-gray-600">
                            <strong>Category:</strong> {product.category}
                        </p>

                        <p className="text-gray-600">
                            <strong>Price:</strong> ${product.price}
                        </p>

                        <p className="text-gray-600">{product.description}</p>

                        <p className="text-gray-600">
                            <strong>Rating:</strong> {product.rating?.rate} (
                            {product.rating?.count} reviews)
                        </p>

                        <p className="text-gray-600">
                            <strong>Product ID:</strong> {product.id}
                        </p>
                        <Link
                            to={`/edit-product/${product.id}`}
                            className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition mr-3"
                            >
                            Edit
                            </Link>


                        <Link
                            to="/"
                            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;