import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function Register() {
  const [form, setForm] = useState({ full_name: "", email: "", password: "", role: "service_seeker" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form, { headers: { "Content-Type": "application/json" } });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Error during registration");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="full_name"
          value={form.full_name}
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        >
          <option value="service_seeker">Service Seeker</option>
          <option value="service_provider">Service Provider</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
