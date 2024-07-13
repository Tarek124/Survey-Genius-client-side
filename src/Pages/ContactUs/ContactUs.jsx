import { useState } from "react";

const ContactUs = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <section>
      {/* Container */}
      <div className="mt-10 mx-auto max-w-7xl px-5 py-16 text-center md:px-10 md:py-20">
        {/* Component */}
        <h2 className="text-3xl font-bold md:text-5xl">Contact</h2>
        <p className="mx-auto mb-8 mt-4 max-w-lg text-gray-500 md:mb-12 lg:mb-16"></p>
        {/* Form */}
        <form
          name="wf-form-name"
          method="get"
          className="mx-auto mb-4 text-left sm:px-4 md:px-20"
        >
          <div className="mb-4 grid w-full grid-cols-2 gap-6">
            <div>
              <label htmlFor="name-2" className="mb-1 font-medium">
                First Name
              </label>
              <input
                type="text"
                className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
                placeholder=""
                required=""
              />
            </div>
            <div>
              <label htmlFor="name-3" className="mb-1 font-medium">
                Last Name
              </label>
              <input
                type="text"
                className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
                placeholder=""
                required=""
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="field" className="mb-1 font-medium">
              Company Website
            </label>
            <input
              type="text"
              className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="field" className="mb-1 font-medium">
              Email
            </label>
            <input
              type="text"
              className="mb-4 block h-9 w-full rounded-md border border-solid border-black px-3 py-6 text-sm text-black"
            />
          </div>
          <div className="mb-5 md:mb-6 lg:mb-8">
            <label htmlFor="field" className="mb-1 font-medium">
              Message
            </label>
            <textarea
              placeholder=""
              maxLength="5000"
              name="field"
              className="mb-2.5 block h-auto min-h-44 w-full rounded-md border border-solid border-black px-3 py-2 text-sm text-black"
            ></textarea>
          </div>
          <label className="flex items-center cursor-pointer mb-1 justify-center pb-4 md:pl-5">
            {/* Toggle */}
            <div
              className={`relative w-12 h-7 transition duration-200 ease-linear rounded-full ${
                checked ? "bg-blue-600" : "bg-gray-100"
              }`}
            >
              {/* Switch */}
              <span
                className={`absolute left-1 top-1 transition duration-200 ease-in-out transform bg-white rounded-full w-5 h-5 ${
                  checked ? "translate-x-5" : ""
                }`}
              />
            </div>
            <input
              type="checkbox"
              className="hidden"
              checked={checked}
              onChange={handleChange}
            />
            <span
              className="ml-4 inline-block cursor-pointer text-sm max-w-48 md:max-w-full"
              htmlFor="checkbox-2"
            >
              By selecting this, you agree to the{" "}
              <a href="#"> Privacy Policy</a> and <a href="#">Cookie Policy</a>
            </span>
          </label>

          <input
            type="submit"
            value="Send"
            className="inline-block w-full rounded-md cursor-pointer bg-black px-6 py-3 text-center font-semibold text-white"
          />
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
