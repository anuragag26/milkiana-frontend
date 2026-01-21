import { motion } from "framer-motion";
import VideoBackground from "./VideoBackground";

const Hero = () => {
  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <VideoBackground />

      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Milkiana Pashu Aahar
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Quality Feed for Healthy & High Milk Yield Cattle
          </p>
          <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold">
            Explore Products
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
