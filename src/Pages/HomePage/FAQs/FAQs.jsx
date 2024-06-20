/* eslint-disable react/no-unescaped-entities */
import img from "./undraw_Questions_re_1fy7.png";
import useAuth from "../../../hooks/useAuth";

const faqs = [
  {
    question: "What is this website about?",
    answer:
      "Our website is a platform for creating, sharing, and participating in surveys. It allows users to gather opinions and insights from a diverse audience.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Click on the 'Sign Up' button at the top right corner of the homepage. Fill in your details and follow the prompts to create your account.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes, creating an account and participating in surveys is completely free. However, there may be premium features available for an enhanced experience.",
  },
  {
    question: "How do I create a survey?",
    answer:
      "Once logged in, click on the 'Create Survey' button. Follow the instructions to add questions, set preferences, and publish your survey.",
  },
  {
    question: "Can I see the results of the surveys I participate in?",
    answer:
      "Yes, you can view the results of any survey you participate in. Go to the survey page and click on 'View Results' to see the responses.",
  },
];
const FAQs = () => {
  const { user } = useAuth();
  return (
    <div className="mt-4">
      <div className="flex h-1/2 justify-center p-4 ">
        <div className="my-8 lg:w-1/3 pt-8">
          <h1 className="text-5xl font-bold my-4">FAQs</h1>
          <p className="text-xl">
            Have questions? Here you'll find the answers most valued by out
            partners, along with access to step-by-step instructions and
            support.
          </p>
        </div>
        <img className="hidden lg:flex w-1/3" src={img} alt="" />
      </div>
      <div className="bg-[#FFF0F5] px-4 py-20">
        <div className="max-w-7xl mx-auto lg:flex gap-4">
          <div className="lg:w-1/2 mb-8 lg:pr-8">
            <form>
              <h1 className="text-3xl font-semibold mb-8">
                Ask your questions
              </h1>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="Email"
                  defaultValue={user?.email}
                />
              </label>

              <textarea
                className="textarea textarea-bordered w-full my-2"
                placeholder="right here"
              />
              <input type="submit" value="Submit" className="btn btn-primary" />
            </form>
          </div>
          <div>
            {faqs.map((faq, index) => (
              <div key={index} className="collapse bg-[#f8dee7] my-2">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-medium">
                  {faq.question}
                </div>
                <div className="collapse-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
