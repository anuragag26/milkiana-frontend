import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Order = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    sacks: 1,
  });

  if (!product) {
    navigate("/products");
    return null;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!/^[6-9]\d{9}$/.test(form.phone)) {
        alert("Enter a valid 10-digit Indian mobile number");
        return;
      }

      if (Number(form.sacks) <= 0) {
        alert("Order quantity must be greater than 0");
        return;
      }

      if (form.address.trim().length < 10) {
        alert("Please enter full delivery address");
        return;
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, {
        productId: String(product.id),
        productName: product.name,
        customerName: form.customerName.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        sacks: Number(form.sacks), // 🔥 FIX
      });

      toast.success("Order placed successfully 🚀");
      navigate("/");
    } catch (error) {
      toast.error("Order failed. Please try again.");
    }
  };

  return (
    <section className="pt-24 pb-16 min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Order: {product.name}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="customerName"
            placeholder="Customer Name"
            className="w-full border p-2 rounded"
            required
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            className="w-full border p-2 rounded"
            required
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            className="w-full border p-2 rounded"
            required
            onChange={handleChange}
          />

          <input
            type="number"
            name="sacks"
            min="1"
            className="w-full border p-2 rounded"
            onChange={handleChange}
            value={form.sacks}
          />

          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
            Place Order
          </button>
        </form>
      </div>
    </section>
  );
};

export default Order;
