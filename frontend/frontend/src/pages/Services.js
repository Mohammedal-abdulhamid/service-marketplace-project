import { useEffect, useState } from "react";
import api from "../utils/api";

function Services() {
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

  return (
    <div>
      <h2>Available Services</h2>
      <ul>
        {services.map((s) => (
          <li key={s.id}>
            <strong>{s.title}</strong> - {s.description} (${s.budget})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Services;
