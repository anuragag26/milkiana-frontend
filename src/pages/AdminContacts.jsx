import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/contact", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContacts(res.data);
    } catch {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (id) => {
    try {
      await axios.put(
        `http://localhost:4000/api/contact/${id}/read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setContacts((prev) =>
        prev.map((c) => (c._id === id ? { ...c, isRead: true } : c)),
      );

      toast.success("Marked as read");
    } catch (err) {
      toast.error("Failed to update message");
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/contact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts((prev) => prev.filter((c) => c._id !== id));
      toast.success("Message deleted");
    } catch (err) {
      toast.error("Failed to delete message");
    }
  };

  if (loading) {
    return <div className="pt-24 text-center">Loading messages...</div>;
  }

  return (
    <>
      <Navbar />
      <section className="pt-32 pb-16 min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Admin – Contact Messages</h1>

          {contacts.length === 0 ? (
            <p>No messages found.</p>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl shadow">
              <table className="min-w-full border">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="p-3 text-left">#</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Phone</th>
                    <th className="p-3 text-left">Message</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {contacts.map((c, i) => (
                    <tr
                      key={c._id}
                      className={`border-b ${!c.isRead ? "bg-yellow-50" : ""}`}
                    >
                      <td className="p-3">{i + 1}</td>
                      <td className="p-3 font-medium">{c.name}</td>
                      <td className="p-3">{c.phone}</td>
                      <td className="p-3 max-w-sm truncate">{c.message}</td>
                      <td className="p-3">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        {c.isRead ? (
                          <span className="text-green-600 font-semibold">
                            Read
                          </span>
                        ) : (
                          <span className="text-yellow-600 font-semibold">
                            Unread
                          </span>
                        )}
                      </td>
                      <td className="p-3 space-x-2">
                        {!c.isRead && (
                          <button
                            onClick={() => markRead(c._id)}
                            className="bg-blue-600 text-white px-3 py-1 rounded"
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => deleteMessage(c._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AdminContacts;
