import Hero from "../components/home/Hero";
import ProductHighlights from "../components/home/ProductHighlights";
import BrandAmbassador from "../components/home/BrandAmbassador";
import DealerInfo from "../components/home/DealerInfo";
import ChatBot from "../components/home/ChatBot";
import DealersMeet from "../components/home/DealersMeet";

const Home = () => {
  return (
    <>
      <Hero />
      <ProductHighlights />
      <BrandAmbassador />
      <DealersMeet />
      <DealerInfo />
      <ChatBot />
    </>
  );
};

export default Home;
