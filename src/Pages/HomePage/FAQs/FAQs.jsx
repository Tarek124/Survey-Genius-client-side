
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
    <div className="sm:mt-12 mx-auto max-w-7xl shadow sm:border sm:border-[#7f7e7f38] px-4 sm:px-8 rounded mb-20">
      <div className="sm:px-8 sm:py-20">
        <div className="max-w-7xl mx-auto lg:flex gap-4">
          <div className="lg:w-1/2 mb-8 lg:pr-8">
            <form>
              <h1 className="sm:text-3xl font-semibold mb-4 sm:mb-8">
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
                placeholder="right here..."
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary text-white"
              />
            </form>
          </div>
          <div className="sm:border-[#7f7e7f38] sm:border sm:p-6 rounded">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="collapse shadow-xl border border-[#7f7e7f38] my-2"
              >
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
