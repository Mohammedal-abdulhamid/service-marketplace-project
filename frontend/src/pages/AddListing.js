import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const AddListing = () => {
  const { auth } = useAuth();
  const token = auth?.token;
  const navigate = useNavigate();

  const [form, setForm] = useState({
    type: "service", // default
    title: "",
    description: "",
    price: "",
    budget: "",
    category: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("You must log in to add a listing.");
      return;
    }

    try {
      if (form.type === "service") {
        await api.post(
          "/services",
          {
            title: form.title,
            description: form.description,
            price: form.price,
            category: form.category,
            location: form.location,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Service created!");
        navigate("/service-providers");
      } else {
        await api.post(
          "/requests",
          {
            title: form.title,
            description: form.description,
            budget: form.budget,
            category: form.category,
            location: form.location,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Request created!");
        navigate("/requesters");
      }
    } catch (err) {
      console.error("Error creating listing:", err);
      alert(err.response?.data?.message || "Failed to create listing");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Listing</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type Switch */}
        <div>
          <label className="block mb-1 font-medium">Listing Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          >
            <option value="service">Service (Provider)</option>
            <option value="request">Request (Seeker)</option>
          </select>
        </div>

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="border rounded w-full px-3 py-2"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="border rounded w-full px-3 py-2"
        />

        {/* Category */}
        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Plumbing, Tutoring)"
          value={form.category}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2"
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2"
        />

        {/* Price or Budget */}
        {form.type === "service" ? (
          <input
            type="number"
            name="price"
            placeholder="Price (£)"
            value={form.price}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        ) : (
          <input
            type="number"
            name="budget"
            placeholder="Budget (£)"
            value={form.budget}
            onChange={handleChange}
            className="border rounded w-full px-3 py-2"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddListing;
