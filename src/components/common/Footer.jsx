const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Milkiana</h2>
          <p>
            Premium quality cattle feed for better milk yield and healthier livestock.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>Home</li>
            <li>Products</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Dealer Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Dealer Info</h3>
          <p>Anurag Agro Traders</p>
          <p>Bilaspur, Chhattisgarh</p>
          <p className="mt-2">📞 +91 9XXXXXXXXX</p>
        </div>

      </div>

      <div className="text-center text-sm text-gray-400 mt-10 py-4 border-t border-gray-700">
        © {new Date().getFullYear()} Milkiana. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
