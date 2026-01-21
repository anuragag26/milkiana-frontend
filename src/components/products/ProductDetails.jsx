import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProductDetails = ({ product, onClose }) => {
  const navigate = useNavigate();

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl max-w-md w-full p-6 relative"
      >
        <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
          <button onClick={onClose} className="absolute top-3 right-3 text-xl">
            ✕
          </button>

          <img
            src={product.image}
            alt={product.name}
            className="h-48 w-full object-cover rounded-lg"
          />

          <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
          <p className="text-green-600 mt-1">Milk Yield: {product.milkRange}</p>

          <p className="mt-3 text-gray-700">{product.description}</p>

          <ul className="mt-4 list-disc list-inside text-gray-600">
            {product.benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

          <button
            onClick={() => navigate("/order", { state: { product } })}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            Order This Product
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
