import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("user"); // user | admin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const endpoint =
        role === "admin"
          ? "http://localhost:4000/api/admin/login"
          : "http://localhost:4000/api/auth/login";

      const res = await axios.post(endpoint, {
        email,
        password,
        role, // 🔥 IMPORTANT FIX
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(
        res.data.user.role === "admin"
          ? "Welcome Admin 👋"
          : `Welcome ${res.data.user.name} 👋`,
      );

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid email or password");
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
            Welcome Back
          </h1>
          <p className="text-gray-600 mt-2">Login to continue with Milkiana</p>
        </div>

        {/* ROLE SELECT */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Login as</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`flex-1 py-2 rounded-lg border transition ${
                role === "user"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700"
              }`}
            >
              User
            </button>
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex-1 py-2 rounded-lg border transition ${
                role === "admin"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-700"
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-5">
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
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* SIGNUP */}
        {role === "user" && (
          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-green-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        )}
      </div>
    </section>
  );
};

export default Login;
