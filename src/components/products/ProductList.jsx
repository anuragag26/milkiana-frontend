import { useState } from "react";
import products from "./productData";
import ProductCard from "./ProductCard";
import ProductDetails from "./ProductDetails";

const ProductList = () => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={setSelected}
          />
        ))}
      </div>

      <ProductDetails
        product={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
};

export default ProductList;
