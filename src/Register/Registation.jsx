import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import myAnimation from "./Animation - 1715438369048.json";
import useAuth from "../hooks/useAuth";
import { IoMdPhotos } from "react-icons/io";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Notify } from "notiflix";
import toast, { Toaster } from "react-hot-toast";

const Registation = () => {
  const { createUser, updateUser, user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const myLocation = location.state ? location.state : "/";
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const myEmail = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;
    const email = myEmail.toLowerCase();
    const userData = { email, name, role: "user", user };
    toast.promise(
      createUser(email, password)
     .then((res) => {
       updateUser(name, photoURL)
         .then(() => {
           axiosPublic
             .post("users", { ...userData, user: res.user })
             .then(() => {
               navigate(myLocation);
               form.reset();
             })
             .catch((err) => {
               console.log(err);
             });
         })
         .catch((err) => {
           console.log(err);
           Notify.failure("username or photo url is not valid");
         });
     }),
     {
       loading: "loading...",
       success: <b>Registation successfully!</b>,
       error: <b>Registration failed</b>,
     }
   );
   
  
  };
  return (
    <div className="mt-16 p-4 flex justify-center">
      <div
        className="border border-[#7f7e7f38] my-8 lg:w-[50vw] w-full flex rounded-xl overflow-hidden
      required shadow-lg items-center"
      >
        <form
          onSubmit={handleRegister}
          className="lg:w-[50vw] w-full flex flex-col items-center p-6 lg:p-20 gap-4"
        >
          <h1 className="text-xl font-semibold">REGISTER</h1>
          <label className="input border-[#7f7e7f38] flex items-center gap-2 w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              name="name"
              className="grow"
              placeholder="Name"
              required
            />
          </label>
          <label className="input border-[#7f7e7f38] flex items-center gap-2 w-full">
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
              name="email"
              className="grow"
              placeholder="Email"
              required
            />
          </label>
          <label className="input border-[#7f7e7f38] w-full flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password"
              className="grow"
              placeholder="Password"
              required
            />
          </label>{" "}
          <label className="input border-[#7f7e7f38] w-full flex items-center gap-2">
            <div className="opacity-[70%]">
              <IoMdPhotos />
            </div>
            <input
              type="text"
              name="photoURL"
              className="grow"
              placeholder="Photo URL"
              required
            />
          </label>
          <button className="btn text-white bg-[#1976D2] w-full">
            Register Now
          </button>
          <p className="text-sm mt-2">
            Already Have An Account ?
            <Link to="/login" className="btn-link">
              Login
            </Link>
          </p>
        </form>
        <div className="lg:w-[50vw] h-full lg:flex hidden bg-gradient-to-r from-sky-500 to-indigo-500">
          <Lottie animationData={myAnimation} />
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false}/>
    </div>
  );
};

export default Registation;
