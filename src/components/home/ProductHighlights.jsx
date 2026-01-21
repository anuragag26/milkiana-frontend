import FadeInSection from "../common/FadeInSection";
import milk2000 from "../../assets/images/products/2000.jpg"
import milk4000 from "../../assets/images/products/4000.jpg"
import milk6000 from "../../assets/images/products/6000.jpg"

const products = [
  {
    name: "Milkiana 2000",
    desc: "For 5–8 litre milk yield",
    img: milk2000,
  },
  {
    name: "Milkiana 4000",
    desc: "For 8–12 litre milk yield",
    img: milk4000,
  },
  {
    name: "Milkiana 6000",
    desc: "For 12–18 litre milk yield",
    img: milk6000,
  },
];

const ProductHighlights = () => {
  return (
    <section id="products" className="py-16 bg-gray-100">
      <FadeInSection>
        <h2 className="text-3xl font-bold text-center mb-10">Our Products</h2>
      </FadeInSection>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={product.img}
              alt={product.name}
              className="h-67 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductHighlights;
