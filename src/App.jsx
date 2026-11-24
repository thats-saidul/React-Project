import { createBrowserRouter } from "react-router";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "product/:productid", element: <ProductDetails /> },
      { path: "add-product", element: <AddProduct /> },
      { path: "edit-product/:productid", element: <EditProduct /> },
    ],
  },
]);

export default router;