import BackgroundBeams from "./BackgroundBeams ";

const HeroSection = () => {
  return (
    <div>
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
            <button className="btn btn-primary cursor-pointer">
              Explore Surveys
            </button>
          </div>
        </div>
        <BackgroundBeams />
      </div>
    </div>
  );
};

export default HeroSection;
