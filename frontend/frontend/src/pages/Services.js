import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services");
        setServices(res.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  if (!services.length) {
    return <div className="text-center mt-20">No services available.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Available Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.service_id} className="bg-white p-4 rounded-xl shadow-md relative">
            {/* Role label */}
            <span
              className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${
                service.role === "provider"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {service.role === "provider" ? "Provider" : "Seeker"}
            </span>

            <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
            <p className="text-gray-600 mb-2">{service.description}</p>

            <div className="flex items-center justify-between mb-4">
              <span className="text-blue-600 font-semibold">
                Price: {service.price !== undefined
                  ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(Number(service.price))
                  : 'N/A'}
              </span>
              <span className="text-gray-700 text-sm">
                By: {service.User?.full_name || "Unknown"}
              </span>
            </div>

            <Link
              to={`/services/${service.service_id}`}
              className="block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
