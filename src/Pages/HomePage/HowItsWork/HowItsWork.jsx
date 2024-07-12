import { InfiniteMovingCards } from "./InfiniteMovingCards ";
import image from "../../../../public/icons/user-guide.png";

const howItWorksSteps = [
  {
    name: "Browse Surveys",
    quote:
      "Explore a variety of surveys available on our platform. You can browse through the featured and latest surveys sections to find ones that interest you.",
  },
  {
    name: "Participate and Vote",
    quote:
      "Participate in surveys by answering questions and casting your vote. Your input helps shape the results and provides valuable insights.",
  },
  {
    name: "Create Your Own Surveys",
    quote:
      "Have a question that needs answers? Create your own survey and share it with our community. Gather opinions and insights from a diverse audience.",
  },
  {
    name: "Track Results",
    quote:
      "Monitor the results of the surveys you participate in or create. See how opinions and preferences shift over time.",
  },
];

const HowItsWork = () => {
  return (
    <div className="h-[40rem] mt-6 rounded-md flex flex-col  items-center justify-center relative overflow-hidden">
      <div className="flex justify-center items-center my-4">
        <img className="w-16 md:w-20" src={image} alt="" />
        <h1 className="text-3xl md:text-4xl font-semibold">How its work</h1>
      </div>
      <InfiniteMovingCards
        items={howItWorksSteps}
        direction="right"
        speed="slow"
      />
    </div>
  );
};

export default HowItsWork;
