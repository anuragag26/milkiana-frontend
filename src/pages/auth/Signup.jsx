import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        name,
        email,
        password,
      });

      toast.success("Account created successfully 🎉");
      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Signup failed. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-24">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-green-700">
            Create Account
          </h1>
          <p className="text-gray-600 mt-2">
            Join Milkiana and grow with us 🌱
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSignup} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
