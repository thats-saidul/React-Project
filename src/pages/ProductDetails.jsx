
import React from "react";
import { useParams, Link } from "react-router";
// import {products} from "../data/products.js";

const ProductDetails = ({ products }) => {
    // URL theke prodict ID niye asha
    const { productid } = useParams();

    // ID onujayi product khuja ber kora
    const product = products.find(
        (item) => item.id === Number(productid)
    );

    // Product na thakle error message dekhano
    if (!product) {
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

                    {/* Product Image */}
                    <div className="md:w-1/2">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-72 object-cover rounded-lg"
                        />
                    </div>

                    {/* Product Information */}
                    <div className="md:w-1/2 space-y-4">

                        <h2 className="text-2xl font-bold text-slate-800">
                            {product.name}
                        </h2>

                        <p className="text-gray-600">
                            <strong>Category:</strong> {product.category}
                        </p>

                        <p className="text-gray-600">
                            <strong>Price:</strong> ৳
                            {product.price.toLocaleString("en-BD")}
                        </p>

                        <p className="text-gray-600">
                            <strong>Stock:</strong> {product.stock}
                        </p>

                        <p className="text-gray-600">
                            <strong>Product ID:</strong> {product.id}
                        </p>

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
