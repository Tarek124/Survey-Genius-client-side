import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import SmoothScroll from "../components/SmoothScroll/SmoothScroll";

const Home = () => {
  return (
    <div>
      <Navbar />
      <SmoothScroll>
        <Outlet />
      </SmoothScroll>
    </div>
  );
};

export default Home;
