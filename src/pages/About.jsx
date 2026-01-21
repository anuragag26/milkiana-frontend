import Counter from "../components/common/Counter";
import MainLayout from "../layouts/MainLAyout";

const AboutUs = () => {
  return (
    <MainLayout>
      <section className="pt-24 pb-20 bg-linear-to-b from-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          {/* HERO */}
          <div className="text-center mb-20">
            <span
              className="inline-block mb-4 px-4 py-1 text-sm font-semibold rounded-full
            bg-green-100 text-green-700"
            >
              About Milkiana
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Nourishing Cattle,
              <span className="text-green-600"> Empowering Farmers</span>
            </h1>

            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Milkiana Pashu Aahar is a trusted cattle feed brand committed to
              improving milk yield, animal health, and farmer prosperity through
              scientifically formulated nutrition.
            </p>
          </div>

          {/* WHO WE ARE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
              <div className="w-20 h-1 bg-green-600 mb-6 rounded"></div>

              <p className="text-gray-700 leading-relaxed mb-4">
                Milkiana is a premium cattle feed brand developed to meet the
                nutritional needs of dairy animals. Our products are carefully
                crafted to deliver consistent results in milk production,
                digestion, and immunity.
              </p>

              <p className="text-gray-700 leading-relaxed">
                By working closely with farmers and dairy experts, we ensure
                quality, trust, and long-term value for the dairy community.
              </p>
            </div>

            {/* FOCUS CARD */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition">
              <h3 className="text-2xl font-semibold mb-6 text-green-700">
                Our Core Strengths
              </h3>

              <ul className="space-y-4 text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                  Balanced & nutritious cattle feed
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                  Improved milk yield & quality
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                  Better animal health & digestion
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                  Affordable & farmer-friendly solutions
                </li>
              </ul>
            </div>
          </div>

          {/* MISSION & VISION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-4 text-green-700">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To empower dairy farmers by providing high-quality, affordable,
                and effective cattle feed that enhances milk productivity and
                overall animal health.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-4 text-green-700">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To become one of India’s most trusted cattle feed brands by
                setting new benchmarks in quality, reliability, and farmer
                satisfaction.
              </p>
            </div>
          </div>

          {/* BRAND & DEALER */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div
              className="bg-linear-to-br from-green-600 to-green-700
            text-white rounded-2xl p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-4">Brand Ambassador</h3>
              <p className="leading-relaxed">
                Milkiana is proudly associated with renowned actor
                <span className="font-semibold"> Govinda</span>, whose trust and
                popularity reflect our commitment to quality and reliability.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-green-700">
                Authorized Dealer
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We are an authorized Milkiana dealer, delivering genuine
                products and dependable service to dairy farmers.
              </p>
              <p className="text-gray-700">
                📍 <strong>Location:</strong> Raigarh, Chhattisgarh
                <br />
                📞 <strong>Phone:</strong> XXXXXXXXXX
              </p>
            </div>
          </div>

          <div className="bg-green-600 rounded-3xl py-16 px-6 mb-24">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 text-center text-white">
              <div>
                <Counter end={15} />
                <p className="mt-2 text-lg font-medium">Years of Experience</p>
              </div>

              <div>
                <Counter end={5000} />
                <p className="mt-2 text-lg font-medium">Farmers Served</p>
              </div>

              <div>
                <Counter end={25000} />
                <p className="mt-2 text-lg font-medium">Orders Delivered</p>
              </div>
            </div>
          </div>

          {/* CLOSING */}
          <div className="text-center">
            <p className="text-lg font-medium text-gray-700">
              Milkiana — Building a stronger dairy future, one farmer at a time.
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default AboutUs;
