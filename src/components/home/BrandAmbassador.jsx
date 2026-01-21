import brandAmbassador from "../../assets/images/ambassador/brand.jpg"

const BrandAmbassador = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
        <img
          src={brandAmbassador}
          alt="Brand Ambassador"
          className="w-72 rounded-xl shadow-lg"
        />

        <div>
          <h2 className="text-3xl font-bold mb-4">Our Brand Ambassador</h2>
          <p className="text-gray-700 text-lg">
            Trusted and promoted by a renowned personality, Milkiana ensures
            quality, nutrition, and higher milk production for your cattle.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BrandAmbassador;
