import { Link } from "react-router-dom";
import image from "./undraw_survey_05s5.svg";
const HeroSection = () => {
  return (
    <div className="lg:py-20">
      <div className=" lg:flex mt-20 justify-center items-center py-10 gap-10 p-4">
        <div className="lg:mb-0 mb-4">
          <p className="text-sm md:text-xl font-sans">
            Faster, Smarter, Affofdable Survey Software
          </p>
          <h1 className="text-2xl lg:text-5xl tracking-wide font-serif font-semibold my-1">
            Powerful online survey
          </h1>
          <p>
            Experience perfect combination of speed to value, ease of use, and
            security.
          </p>
          <button className="my-4">
            <Link to="/" className=" text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Explore
            </Link>
          </button>
        </div>
        <div>
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
