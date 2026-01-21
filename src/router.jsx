import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Order from "./pages/Order";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminContacts from "./pages/AdminContacts";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <Home /> }],
  },
  {
    path: "products",
    element: <Products />,
  },
  {
    path: "order",
    element: <Order />,
  },
  {
    path: "admin",
    element: (
      <AdminProtectedRoute>
        <Admin />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/admin/contacts",
    element: (
      <AdminProtectedRoute>
        <AdminContacts />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
