import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">Service Marketplace</Link>
        </div>
        <div className="space-x-4">
          <Link to="/services" className="hover:underline">All Services</Link>
          <Link to="/service-requests" className="hover:underline">Requests</Link>
          <Link to="/service-providers" className="hover:underline">Providers</Link>
          {token ? (
            <>
              <Link to="/create-service" className="hover:underline">Create Service</Link>
              <button onClick={logout} className="ml-2 bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
