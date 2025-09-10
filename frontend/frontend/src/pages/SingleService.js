import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

const SingleService = () => {
  const { id } = useParams(); 
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${id}`);
        setService(res.data);
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!service) return <div className="text-center mt-20">Service not found.</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl relative">
      {/* Role label */}
      <span
      
        className={`absolute top-6 right-6 text-xs font-bold px-3 py-1 rounded-full ${
          service.role === "provider"
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {service.role === "provider" ? "Provider" : "Seeker"}
      </span>

      <h1 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h1>
      <p className="text-gray-600 mb-4">{service.description}</p>

      <div className="flex items-center justify-between mb-6">
        <span className="text-lg font-semibold text-blue-600">
          Price: {service.price !== undefined
            ? new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(Number(service.price))
            : 'N/A'}
        </span>
        <span className="text-gray-700">By: {service.User?.full_name || "Unknown"}</span>
      </div>

      <div className="flex gap-4">
        {service.user?.role === "seeker" ? (
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Offer Help
          </button>
        ) : (
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
            Request Service
          </button>
        )}
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Contact {service.User?.role === "provider" ? "Provider" : "Seeker"}
        </button>
      </div>
    </div>
  );
};

export default SingleService;
