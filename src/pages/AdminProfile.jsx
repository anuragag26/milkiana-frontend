import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = sessionStorage.getItem("admin-auth");
    if (auth !== "true") {
      navigate("/admin");
    }
  }, []);

  return (
    <section className="pt-24 min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Profile</h1>

        <div className="bg-white rounded-xl shadow p-6">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold">
              MA
            </div>
            <div>
              <h2 className="text-xl font-semibold">Milkiana Admin</h2>
              <p className="text-gray-500">Administrator</p>
            </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ProfileItem label="Role" value="Admin" />
            <ProfileItem label="Access Level" value="Full Access" />
            <ProfileItem label="Email" value="admin@milkiana.com" />
            <ProfileItem label="Phone" value="+91 XXXXX XXXXX" />
            <ProfileItem label="App Name" value="Milkiana Order System" />
            <ProfileItem label="Version" value="1.0.0" />
          </div>
        </div>
      </div>
    </section>
  );
};

const ProfileItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default AdminProfile;
