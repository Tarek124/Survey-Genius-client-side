const howItWorksSteps = [
  {
    title: "Sign Up or Log In",
    description:
      "Create a new account or log in to your existing account to start exploring and participating in surveys.",
  },
  {
    title: "Browse Surveys",
    description:
      "Explore a variety of surveys available on our platform. You can browse through the featured and latest surveys sections to find ones that interest you.",
  },
  {
    title: "Participate and Vote",
    description:
      "Participate in surveys by answering questions and casting your vote. Your input helps shape the results and provides valuable insights.",
  },
  {
    title: "Create Your Own Surveys",
    description:
      "Have a question that needs answers? Create your own survey and share it with our community. Gather opinions and insights from a diverse audience.",
  },
  {
    title: "Track Results",
    description:
      "Monitor the results of the surveys you participate in or create. See how opinions and preferences shift over time.",
  },
];

const HowItsWork = () => {
  return (
    <div className="relative px-4 py-12  half-bg mx-auto">
      <div className=" py-8 flex flex-col gap-4 justify-center items-center">
        <h1 className="mb-4 text-white text-4xl">How it Works</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
          {howItWorksSteps.map((step, index) => (
            <div key={index}>
              <div className="card sm:w-60 min-h-[300px] bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{step.title}</h2>
                  <p>{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItsWork;
