import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { auth, logout } = useAuth();
  const token = auth?.token;

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Brand */}
        <div className="text-lg font-bold">
          <Link to="/">Service Marketplace</Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-4">
          <Link to="/services" className="hover:underline">
            All Services
          </Link>
          <Link to="/providers" className="hover:underline">
            Providers
          </Link>
          <Link to="/requests" className="hover:underline">
            Requests
          </Link>

          {token ? (
            <>
              <Link to="/create-service" className="hover:underline">
                Create Service
              </Link>
              <button
                onClick={logout}
                className="ml-2 bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
