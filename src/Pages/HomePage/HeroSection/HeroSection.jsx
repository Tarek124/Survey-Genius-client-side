import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FlipWords } from "../../../components/FlipWords/FlipWords";

const HeroSection = () => {
  const words = [
    "Engage",
    "Discover",
    "Analyze",
    "Succeed",
    "Insightful",
    "Innovative",
    "Capture",
    "Feedback",
    "Analyze",
    "Reliable",
    "Decide",
    "Customizable",
  ];

  return (
    <div className="h-screen items-center justify-center flex">
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 py-4 bg-clip-text text-center text-5xl font-medium tracking-tight md:text-7xl"
      >
        <Link to="/surveys">
          <FlipWords words={words} /> <br /> <span>With Survey Genius</span>
        </Link>
      </motion.h1>
    </div>
  );
};

export default HeroSection;
