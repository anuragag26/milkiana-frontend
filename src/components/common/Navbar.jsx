import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  /* ================= FORCE SCROLL ON NON-HOME ================= */
  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
    }
  }, [isHome]);

  /* ================= SCROLL EFFECT (HOME ONLY) ================= */
  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  /* ================= LOAD USER ================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  /* ================= CLOSE DROPDOWN ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  /* ================= LINK STYLE ================= */
  const linkClass = (path) =>
    `cursor-pointer transition-colors ${
      location.pathname === path
        ? "text-green-600 font-semibold"
        : scrolled || !isHome
          ? "text-gray-800"
          : "text-white"
    }`;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300
      ${scrolled || !isHome ? "bg-white shadow-md" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* LOGO */}
        <span
          onClick={() => navigate("/")}
          className={`text-2xl font-bold cursor-pointer ${
            scrolled || !isHome ? "text-green-700" : "text-white"
          }`}
        >
          Milkiana
        </span>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-6">
          <span onClick={() => navigate("/")} className={linkClass("/")}>
            Home
          </span>

          <span
            onClick={() => navigate("/products")}
            className={linkClass("/products")}
          >
            Products
          </span>

          <span
            onClick={() => navigate("/about")}
            className={linkClass("/about")}
          >
            About Us
          </span>

          <span
            onClick={() => navigate("/contact")}
            className={linkClass("/contact")}
          >
            Contact
          </span>

          {user?.role === "admin" && (
            <span
              onClick={() => navigate("/admin")}
              className={linkClass("/admin")}
            >
              Dashboard
            </span>
          )}

          {/* AUTH SECTION */}
          {!user ? (
            <span
              onClick={() => navigate("/login")}
              className={linkClass("/login")}
            >
              Login
            </span>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <div
                onClick={() => setDropdownOpen((p) => !p)}
                className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold cursor-pointer"
                title={user.role === "admin" ? "Hi Admin" : `Hi ${user.name}`}
              >
                {user.role === "admin"
                  ? "A"
                  : user.name.charAt(0).toUpperCase()}
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border">
                  <div className="px-4 py-3 text-sm border-b">
                    👋 Hi,{" "}
                    <strong>
                      {user.role === "admin" ? "Admin" : user.name}
                    </strong>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className={`md:hidden text-2xl ${
            scrolled || !isHome ? "text-gray-800" : "text-white"
          }`}
          onClick={() => setMobileOpen((p) => !p)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
          <div onClick={() => navigate("/")}>Home</div>
          <div onClick={() => navigate("/products")}>Products</div>
          <div onClick={() => navigate("/about")}>About Us</div>
          <div onClick={() => navigate("/contact")}>Contact</div>
          {!user && <div onClick={() => navigate("/login")}>Login</div>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
