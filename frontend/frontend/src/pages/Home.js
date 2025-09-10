import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to the Service Marketplace</h1>
      <p className="text-lg mb-6 text-center max-w-xl">
        Connect service providers and requesters in one platform. Browse services, post your own requests, or offer your expertise.
      </p>
      <div className="space-x-4">
        <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">Register</Link>
        <Link to="/login" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">Login</Link>
        <Link to="/services" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition">Browse Services</Link>
      </div>
    </div>
  );
}

export default Home;
