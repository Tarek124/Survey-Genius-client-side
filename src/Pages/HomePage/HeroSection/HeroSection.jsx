import { Parallax } from "react-parallax";

const HeroSection = () => {
  return (
    <Parallax
      blur={{ min: -20, max: 20 }}
      bgImage={
        "https://t4.ftcdn.net/jpg/04/85/09/55/360_F_485095547_SEFnUTEscD7auyTTBqmhd7hfRA99sKPP.jpg"
      }
      bgImageAlt="the dog"
      strength={-8200}
      className="bg-fixed"
    >
      <div className="hero min-h-[93vh]">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Welcome to Survey Genius
            </h1>
            <p className="mb-5">
              Create and participate in surveys to share your opinions and
              insights. Join us today and start making a difference!
            </p>
            <button className="btn btn-primary">Explore Surveys</button>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default HeroSection;
