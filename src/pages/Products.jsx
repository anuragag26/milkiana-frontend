import ProductList from "../components/products/ProductList";
import MainLayout from "../layouts/MainLayout";

const Products = () => {
  return (
    <MainLayout>
      <section className="pt-24 pb-16 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Our Products</h1>

          <ProductList />
        </div>
      </section>
    </MainLayout>
  );
};

export default Products;
