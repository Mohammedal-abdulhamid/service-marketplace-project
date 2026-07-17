import React from "react";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h3 className="font-bold text-lg">{service.title}</h3>
      <p>{service.description}</p>
      <p className="font-semibold">Price: £{service.price}</p>
      <Link
        to={`/services/${service.service_id}`} 
        className="mt-2 inline-block px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
};

export default ServiceCard;
