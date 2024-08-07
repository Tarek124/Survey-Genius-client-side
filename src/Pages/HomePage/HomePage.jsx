import FAQs from "./FAQs/FAQs";
import FeaturedSurveys from "./FeaturedSurveys/FeaturedSurveys";
import Footer from "./Footer/Footer";
import HeroSection from "./HeroSection/HeroSection";
import HowItsWork from "./HowItsWork/HowItsWork";
import LatestSurveys from "./LatestSurveys/LatestSurveys";
import { TracingBeam } from "./TracingBeam/TracingBeam";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <div className="overflow-hidden">
        <TracingBeam>
          <FeaturedSurveys />
          <LatestSurveys />
          <HowItsWork />
        </TracingBeam>
      </div>
      <FAQs />
      <Footer />
    </div>
  );
};

export default HomePage;
