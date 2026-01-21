import FadeInSection from "../common/FadeInSection";

const DealersMeet = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <FadeInSection>
          <div className="text-center mb-14">
            <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Community & Growth
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Milkiana <span className="text-green-600">Dealers Meet</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Celebrating partnerships, trust, and shared growth with our
              valued dealers across the years.
            </p>
          </div>
        </FadeInSection>

        {/* VIDEOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* 2021 */}
          <FadeInSection>
            <div className="relative rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
              <iframe
                className="w-full h-80"
                src="https://www.youtube.com/embed/QUi-XY3DKvo"
                title="Milkiana Dealers Meet 2021"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </FadeInSection>

          {/* 2024 */}
          <FadeInSection>
            <div className="relative rounded-2xl overflow-hidden shadow hover:shadow-xl transition">
              <iframe
                className="w-full h-80"
                src="https://www.youtube.com/embed/QnwdACpVVhg"
                title="Milkiana Dealers Meet 2024"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </FadeInSection>

        </div>
      </div>
    </section>
  );
};

export default DealersMeet;
