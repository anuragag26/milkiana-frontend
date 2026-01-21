import { motion } from "framer-motion";

const ProductCard = ({ product, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold">{product.name}</h3>
        <p className="text-green-600 font-medium mt-1">
          Milk Yield: {product.milkRange}
        </p>

        <p className="text-gray-600 mt-3 text-sm">
          {product.description}
        </p>

        <button
          onClick={() => onSelect(product)}
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
