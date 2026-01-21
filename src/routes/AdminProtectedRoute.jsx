import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!token || user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;