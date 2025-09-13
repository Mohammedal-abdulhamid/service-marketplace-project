import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
        {/* Left side: Brand */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-lg font-bold text-white">Service Marketplace</h2>
          <p className="text-sm text-gray-400">
            Connecting providers and seekers seamlessly
          </p>
        </div>

        {/* Middle: Navigation */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/services" className="hover:text-white">All Services</Link>
          <Link to="/providers" className="hover:text-white">Providers</Link>
          <Link to="/requests" className="hover:text-white">Requests</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
        </div>

        {/* Right side: Copyright */}
        <div className="mt-4 md:mt-0 text-sm text-gray-400">
          © {new Date().getFullYear()} Service Marketplace. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
