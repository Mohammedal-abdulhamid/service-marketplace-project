import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const RequestersPage = () => {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [category, setCategory] = useState("all");
  const [budget, setBudget] = useState("all");
  const [location, setLocation] = useState("all");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get("/services");
        const onlyRequests = (res.data || []).filter(
          (item) =>
            item?.type?.toLowerCase() === "request" ||
            item?.role?.toLowerCase() === "seeker"
        );
        setRequests(onlyRequests);
        setFiltered(onlyRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, []);

  useEffect(() => {
    let data = [...requests];

    if (category !== "all") {
      data = data.filter((r) => r.category?.toLowerCase() === category.toLowerCase());
    }

    if (budget === "cheap") data = data.filter((r) => Number(r.budget) < 50);
    else if (budget === "low") data = data.filter((r) => Number(r.budget) >= 50 && Number(r.budget) <= 100);
    else if (budget === "mid") data = data.filter((r) => Number(r.budget) > 100 && Number(r.budget) <= 250);
    else if (budget === "high") data = data.filter((r) => Number(r.budget) > 250 && Number(r.budget) <= 500);
    else if (budget === "luxury") data = data.filter((r) => Number(r.budget) > 500);

    if (location !== "all") {
      data = data.filter((r) => r.location?.toLowerCase() === location.toLowerCase());
    }

    setFiltered(data);
  }, [category, budget, location, requests]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Filter bar */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Requests</h1>
        <div className="flex gap-4 flex-wrap">
          <label>
            Filter:
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="border px-3 py-2 rounded ml-2">
              <option value="all">All Categories</option>
              <option value="beauty">Beauty</option>
              <option value="plumbing">Plumbing</option>
              <option value="cleaning">Cleaning</option>
              <option value="electrical">Electrical</option>
              <option value="gardening">Gardening</option>
              <option value="construction">Construction</option>
              <option value="it">IT Services</option>
              <option value="education">Education</option>
              <option value="health">Health</option>
              <option value="transport">Transport</option>
              
            </select>
          </label>

          <label>
            <select value={budget} onChange={(e) => setBudget(e.target.value)} className="border px-3 py-2 rounded">
              <option value="all">All Budgets</option>
              <option value="cheap">Below £50</option>
              <option value="low">£50 - £100</option>
              <option value="mid">£101 - £250</option>
              <option value="high">£251 - £500</option>
              <option value="luxury">Above £500</option>
            </select>
          </label>

          <label>
            <select value={location} onChange={(e) => setLocation(e.target.value)} className="border px-3 py-2 rounded">
              <option value="all">All Cities</option>
              <option value="london">London</option>
              <option value="manchester">Manchester</option>
              <option value="birmingham">Birmingham</option>
              <option value="leeds">Leeds</option>
              <option value="liverpool">Liverpool</option>
              <option value="glasgow">Glasgow</option>
              <option value="edinburgh">Edinburgh</option>
              <option value="bristol">Bristol</option>
              
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((r) => (
            <Link
              key={r.listing_id ?? r.service_id}
              to={`/services/${r.service_id ?? r.listing_id}`}
              className="block"
            >
              <div className="bg-white p-4 rounded-xl shadow-md relative hover:shadow-lg transition">
                <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                  Seeker
                </span>
                <h2 className="text-xl font-semibold mb-2">{r.title}</h2>
                <p className="text-gray-600 mb-2">{r.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-semibold">
                    {r.budget ? `Budget: £${r.budget}` : "Budget: N/A"}
                  </span>
                  <span className="text-gray-700 text-sm">By: {r.User?.full_name || "Unknown"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestersPage;
