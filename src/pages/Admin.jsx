import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const COLORS = ["#facc15", "#60a5fa", "#22c55e"];

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    toast("Logged out successfully 👋");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login", { replace: true });
  };

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= FILTER LOGIC ================= */
  const filteredOrders = orders.filter((order) => {
    const matchStatus = statusFilter === "ALL" || order.status === statusFilter;

    const orderDate = new Date(order.createdAt);
    const matchStart = !startDate || orderDate >= new Date(startDate);
    const matchEnd = !endDate || orderDate <= new Date(endDate);

    return matchStatus && matchStart && matchEnd;
  });

  /* ================= ANALYTICS ================= */
  const totalOrders = filteredOrders.length;

  const totalSacks = filteredOrders.reduce((sum, o) => sum + o.sacks, 0);

  const pendingOrders = filteredOrders.filter(
    (o) => o.status === "PENDING",
  ).length;

  const acceptedOrders = filteredOrders.filter(
    (o) => o.status === "ACCEPTED",
  ).length;

  const completedOrders = filteredOrders.filter(
    (o) => o.status === "COMPLETED",
  ).length;

  /* ================= CHART DATA ================= */
  const statusChartData = [
    { name: "Pending", value: pendingOrders },
    { name: "Accepted", value: acceptedOrders },
    { name: "Completed", value: completedOrders },
  ];

  const sacksChartData = ["PENDING", "ACCEPTED", "COMPLETED"].map((status) => ({
    name: status,
    value: filteredOrders
      .filter((o) => o.status === status)
      .reduce((sum, o) => sum + o.sacks, 0),
  }));

  /* ================= ACTIONS ================= */
  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/orders/${id}/status`,
        { status },
      );

      setOrders((prev) => prev.map((o) => (o._id === id ? res.data : o)));
      toast.success(`Order ${status.toLowerCase()} ✅`);
    } catch {
      toast.error("Failed to update order");
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Cancel and delete this order?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
      toast.success("Order cancelled and deleted ❌");
    } catch {
      toast.error("Failed to cancel order");
    }
  };

  /* ================= CSV EXPORT ================= */
  const exportToCSV = () => {
    if (filteredOrders.length === 0) {
      alert("No orders to export");
      return;
    }

    const headers = [
      "Product",
      "Customer",
      "Phone",
      "Address",
      "Sacks",
      "Status",
      "Date",
    ];

    const rows = filteredOrders.map((o) => [
      o.productName,
      o.customerName,
      o.phone,
      o.address.replace(/,/g, " "),
      o.sacks,
      o.status,
      new Date(o.createdAt).toLocaleString(),
    ]);

    const csv =
      headers.join(",") + "\n" + rows.map((r) => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "milkiana_orders.csv";
    link.click();
  };

  if (loading) {
    return <div className="pt-24 text-center">Loading orders...</div>;
  }

  return (
    <>
      <Navbar />
      <section className="pt-24 pb-16 min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center w-full mb-10">
            <h1 className="text-3xl font-bold">Admin Dashboard – Analytics</h1>
          </div>

          {/* ANALYTICS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            <StatCard label="Total Orders" value={totalOrders} />
            <StatCard label="Total Sacks" value={totalSacks} />
            <StatCard label="Pending" value={pendingOrders} color="yellow" />
            <StatCard label="Accepted" value={acceptedOrders} color="blue" />
            <StatCard label="Completed" value={completedOrders} color="green" />
          </div>
          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <ChartBox title="Orders by Status">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statusChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </ChartBox>

            <ChartBox title="Sacks Distribution">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sacksChartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {sacksChartData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartBox>
          </div>
          {/* FILTERS */}
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="COMPLETED">Completed</option>
            </select>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 rounded"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 rounded"
            />

            <button
              onClick={exportToCSV}
              className="ml-auto bg-green-600 text-white px-4 py-2 rounded"
            >
              Export CSV
            </button>
            <Link
              to="/admin/contacts"
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              View Messages
            </Link>
          </div>
          {/* TABLE */}
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full border">
              <thead className="bg-green-600 text-white">
                <tr>
                  {[
                    "#",
                    "Product",
                    "Customer",
                    "Phone",
                    "Address",
                    "Sacks",
                    "Date",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th key={h} className="p-3 text-left">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((o, i) => (
                  <tr key={o._id} className="border-b">
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3">{o.productName}</td>
                    <td className="p-3">{o.customerName}</td>
                    <td className="p-3">{o.phone}</td>
                    <td className="p-3 max-w-xs truncate">{o.address}</td>
                    <td className="p-3 text-center">{o.sacks}</td>
                    <td className="p-3">
                      {new Date(o.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      <span className="px-2 py-1 rounded bg-gray-100">
                        {o.status}
                      </span>
                    </td>

                    <td className="p-3 space-x-2">
                      {o.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => updateStatus(o._id, "ACCEPTED")}
                            className="bg-blue-600 text-white px-2 py-1 rounded"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => deleteOrder(o._id)}
                            className="bg-red-600 text-white px-2 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {o.status === "ACCEPTED" && (
                        <button
                          onClick={() => updateStatus(o._id, "COMPLETED")}
                          className="bg-green-600 text-white px-2 py-1 rounded"
                        >
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

/* ================= SMALL REUSABLE COMPONENTS ================= */

const StatCard = ({ label, value, color = "gray" }) => {
  const colors = {
    gray: "bg-white",
    yellow: "bg-yellow-100",
    blue: "bg-blue-100",
    green: "bg-green-100",
  };

  return (
    <div className={`${colors[color]} p-4 rounded-xl shadow text-center`}>
      <p className="text-gray-600">{label}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
};

const ChartBox = ({ title, children }) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <h3 className="font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

export default Admin;
