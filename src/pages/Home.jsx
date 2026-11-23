
import {products} from "../data/products.js";
import { Link } from "react-router";

function Home() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">
        Product List
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full text-left border-collapse">

        
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

         
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-100"
              >
                
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>

               
                <td className="p-4 font-medium">
                  {product.name}
                </td>

                
                <td className="p-4">
                  {product.category}
                </td>

                
                <td className="p-4">
                  ৳{product.price.toLocaleString("en-BD")}
                </td>

                
                <td className="p-4">
                  {product.stock}
                </td>

                
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
