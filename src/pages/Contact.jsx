import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.message) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:4000/api/contact", form);

      toast.success("Thanks! We’ll contact you shortly 👋");

      // Clear form
      setForm({ name: "", phone: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {" "}
      <section className="pt-24 pb-20 bg-linear-to-b from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          {/* HEADER */}
          <div className="text-center mb-16">
            <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Get in <span className="text-green-600">Touch</span> With Us
            </h1>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Have questions about Milkiana products or want to place bulk
              orders? We’re here to help you.
            </p>
          </div>

          {/* CONTENT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* INFO */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow p-6">
                <h3 className="text-2xl font-semibold mb-4">
                  Contact Information
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p>
                    📍 <strong>Address:</strong>
                    <br />
                    Chatamuda Bai Pass Chowk,
                    <br />
                    Near Tata Showroom,
                    <br />
                    Raigarh, Chhattisgarh
                  </p>
                  <p>
                    📞 <strong>Phone:</strong>
                    <br />
                    +91 XXXXXXXXXX
                  </p>
                  <p>
                    ✉️ <strong>Email:</strong>
                    <br />
                    contact@milkiana.com
                  </p>
                </div>
              </div>

              <div className="bg-green-600 text-white rounded-2xl shadow p-6">
                <h3 className="text-2xl font-semibold mb-2">Business Hours</h3>
                <p>
                  Monday – Saturday
                  <br />
                  9:00 AM – 7:00 PM
                </p>
              </div>
            </div>

            {/* FORM */}
            <div className="bg-white rounded-2xl shadow p-8">
              <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>

              <form className="space-y-5" onSubmit={submitHandler}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500"
                />

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500"
                />

                <textarea
                  rows="4"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 resize-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg font-medium transition
                  ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }
                `}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* FOOTER */}
          <div className="text-center mt-20 text-gray-600">
            Milkiana — Reliable nutrition for healthier cattle & better milk
            yield.
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Contact;
