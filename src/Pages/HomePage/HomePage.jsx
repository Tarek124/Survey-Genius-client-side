import FAQs from "./FAQs/FAQs";
import FeaturedSurveys from "./FeaturedSurveys/FeaturedSurveys";
import Footer from "./Footer/Footer";
import HeroSection from "./HeroSection/HeroSection";
import HowItsWork from "./HowItsWork/HowItsWork";
import LatestSurveys from "./LatestSurveys/LatestSurveys";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedSurveys />
      <LatestSurveys />
      <HowItsWork />
      <FAQs />
      <Footer />
    </div>
  );
};

export default HomePage;
