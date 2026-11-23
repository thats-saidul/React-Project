
import { Link, Outlet } from "react-router";

function Layout() {
  return (
    <div className="min-h-screen bg-slate-900 p-6">

      <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-xl">

        <h1 className="text-4xl font-bold text-blue-600 mb-4 text-center">
          My React Website
        </h1>

        <nav className="flex justify-center gap-6 mb-8">
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>

          <Link to="/about" className="text-blue-600 hover:underline">
            About
          </Link>

          <Link to="/contact" className="text-blue-600 hover:underline">
            Contact
          </Link>
        </nav>

        <Outlet />

      </div>
    </div>
  );
}

export default Layout;
