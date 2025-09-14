import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

const SingleService = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const token = auth?.token;

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  // ⭐ Render stars
  const renderStars = (rating) => {
    const filled = "★".repeat(rating);
    const empty = "☆".repeat(5 - rating);
    return (
      <span className="text-yellow-500 text-lg">
        {filled}
        {empty}
      </span>
    );
  };

  // Fetch service, messages, reviews
  useEffect(() => {
    const fetchEverything = async () => {
      try {
        const svcRes = await api.get(`/services/${id}`);
        setService(svcRes.data);

        if (token) {
          const msgRes = await api.get(`/messages/service/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setMessages(msgRes.data || []);
        }

        const revRes = await api.get(`/reviews/service/${id}`);
        setReviews(revRes.data || []);
      } catch (err) {
        console.error("Error fetching service:", err?.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEverything();
  }, [id, token]);

  // 💬 Send message
  const handleSendMessage = async () => {
    if (!token) {
      alert("You must log in to send messages.");
      return;
    }
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      const payload = {
        receiver_id: service?.User?.user_id || service?.provider_id,
        content: newMessage,
        service_id: service?.service_id,
      };
      const res = await api.post("/messages", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err?.response?.data || err.message);
      alert(err?.response?.data?.error || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  // ⭐ Submit review
  const handleAddReview = async () => {
    if (!newReview.rating || !newReview.comment.trim()) {
      alert("Please select a rating and write a comment.");
      return;
    }
    try {
      const payload = {
        service_id: service?.service_id,
        reviewee_id: service?.User?.user_id || service?.provider_id,
        rating: newReview.rating,
        comment: newReview.comment,
      };
      const res = await api.post("/reviews", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews((prev) => [res.data, ...prev]);
      setNewReview({ rating: 0, comment: "" });
    } catch (err) {
      console.error("Error adding review:", err?.response?.data || err.message);
      alert(err?.response?.data?.error || "Failed to add review");
    }
  };

  // 💳 Start checkout
  const handleCheckout = async () => {
    if (!token) {
      alert("You must log in to make a payment.");
      return;
    }
    try {
      const res = await api.post(
        "/payments/create-checkout-session",
        { serviceId: service?.service_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.url) {
        window.location.href = res.data.url; // redirect to Stripe Checkout
      }
    } catch (err) {
      console.error("Payment error:", err?.response?.data || err.message);
      alert("Failed to start payment.");
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!service) return <div className="text-center mt-20">Service not found.</div>;

  const ownerName = service.User?.full_name || service.owner_name || "Unknown";
  const ownerRole = service.User?.role || service.role || "seeker";

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-2xl relative">
      {/* Role label */}
      <span
        className={`absolute top-6 right-6 text-xs font-bold px-3 py-1 rounded-full ${
          ownerRole === "provider"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {ownerRole === "provider" ? "Provider" : "Seeker"}
      </span>

      <h1 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h1>
      <p className="text-gray-600 mb-4">{service.description}</p>

      <div className="flex items-center justify-between mb-6">
        <span className="text-lg font-semibold text-blue-600">
          {service.price
            ? `Price: £${Number(service.price)}`
            : service.budget
            ? `Budget: £${Number(service.budget)}`
            : "N/A"}
        </span>
        <span className="text-gray-700">By: {ownerName}</span>
      </div>

      {/* 💳 Payment Button */}
      {service.price && (
        <div className="mb-6">
          <button
            onClick={handleCheckout}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Pay with Stripe
          </button>
        </div>
      )}

      {/* ⭐ Reviews */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Reviews</h2>
        {reviews.length ? (
          reviews.slice(0, 2).map((rev) => (
            <div key={rev.review_id} className="mb-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <strong>{rev.reviewer?.full_name || "Anonymous"}</strong>
                {renderStars(rev.rating)}
              </div>
              <div className="text-sm text-gray-700">{rev.comment}</div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {token && (
          <div className="mt-4 border-t pt-4">
            <h3 className="text-md font-semibold mb-2">Leave a review</h3>
            <div className="flex gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: n })}
                  className={`text-2xl ${
                    newReview.rating >= n ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <textarea
              value={newReview.comment}
              onChange={(e) =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
              placeholder="Write your review..."
              className="w-full border rounded-lg px-3 py-2 mb-2"
            />
            <button
              onClick={handleAddReview}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Submit Review
            </button>
          </div>
        )}
      </div>

      {/* 💬 Messaging */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-2">Messages</h2>

        {token && (
          <>
            <div className="space-y-2 mb-4 max-h-60 overflow-y-auto border p-3 rounded-lg bg-gray-50">
              {messages.length ? (
                messages.map((msg) => (
                  <div
                    key={msg.message_id}
                    className={`p-2 rounded-lg ${
                      msg.sender_id === service?.User?.user_id
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    <strong>{msg.sender?.full_name || "User"}:</strong>{" "}
                    {msg.content}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No messages yet.</p>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow border rounded-lg px-3 py-2"
              />
              <button
                onClick={handleSendMessage}
                disabled={sending}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </>
        )}

        {!token && (
          <p className="mb-4 text-sm text-red-500">
            You must{" "}
            <a href="/login" className="underline font-semibold">
              log in
            </a>{" "}
            to send or view messages.
          </p>
        )}
      </div>
    </div>
  );
};

export default SingleService;
