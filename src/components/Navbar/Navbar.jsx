import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useSwal from "../../hooks/useSwal";
import { LuCrown } from "react-icons/lu";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const themes = [
  "light",
  "dark",
  "cupcake",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "halloween",
  "garden",
  "forest",
  "lofi",
  "black",
  "night",
  "coffee",
  "winter",
];

const Navbar = () => {
  const { user, logout, userRole } = useAuth();
  const { swalSuccess } = useSwal();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout().then(() => navigate("/"), swalSuccess("logout success"));
  };

  // user
  const userInformation = () => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user?.photoURL}
                  alt=""
                />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {user?.displayName}
                </p>
                <p className="mt-1 text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Close
            </button>
          </div>
        </div>
      ),
      {
        duration: 2000,
      }
    );
  };
  //theme
  const [selectedTheme, setSelectedTheme] = useState("");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme && themes.includes(storedTheme)) {
      setSelectedTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else {
      setSelectedTheme("light"); // Default theme
    }
  }, []);

  const handleThemeChange = (e) => {
    const theme = e.target.value;
    setSelectedTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  useEffect(() => {
    // Use useEffect to force a re-render when user or userRole changes
  }, [user, userRole]); // Specify dependencies that trigger useEffect
  console.log(user, userRole);
  const navLink = (
    <>
      <li className="tracking-wide">
        <Link to="/">Home</Link>
      </li>
      <li className="tracking-wide">
        <Link to="/surveys">Surveys</Link>
      </li>
      <li className="tracking-wide">
        <Link to="/about-us">About Us</Link>
      </li>
      <li className="tracking-wide">
        <Link to="/contact-us">Contact Us</Link>
      </li>
      <li className="tracking-wide">
        <Link to="/termsAndconditions">Terms And Conditions</Link>
      </li>
      {user && userRole ? (
        <li className="tracking-wide">
          <Link
            to={
              userRole === "user" || userRole === "pro-user"
                ? "/dashboard/user/surveys"
                : userRole === "admin"
                ? "/dashboard/admin/users"
                : userRole === "surveyor"
                ? "/dashboard/surveyor/create"
                : ""
            }
          >
            DashBoard
          </Link>
        </li>
      ) : (
        ""
      )}
      {userRole === "user" ? (
        <li>
          <Link
            className="inline-flex h-9 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            to="/payment"
          >
            <LuCrown />
            Try Pro
          </Link>
        </li>
      ) : (
        ""
      )}
    </>
  );
  return (
    <div className="navbar  backdrop-blur-md fixed top-0 left-0 z-10 lg:px-32 shadow-md py-0">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content font-semibold mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLink}
          </ul>
        </div>
        <Link
          to="/"
          className="sm:p-2 text-xl font-semibold font-serif"
        >
          Survey Genius
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold">{navLink}</ul>
      </div>
      <div className="navbar-end">
        <select
          className="select w-24 mx-2 bg-transparent border border-[#7f7e7f38] "
          value={selectedTheme}
          onChange={handleThemeChange}
        >
          <option disabled value="">
            Theme
          </option>
          {themes.map((theme) => (
            <option key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>
        {user ? (
          <div className="dropdown dropdown-end">
            <div className="flex items-center gap-2">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar "
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li onClick={userInformation}>
                <a>{user?.displayName}</a>
              </li>

              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link className="mr-2 btn font-semibold text-blue-500" to="/login">
            Login
          </Link>
        )}
      </div>

      <Toaster />
    </div>
  );
};

export default Navbar;
