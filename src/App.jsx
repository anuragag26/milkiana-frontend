import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
