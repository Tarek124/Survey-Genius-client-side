import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { LuCrown } from "react-icons/lu";
import { useEffect, useState } from "react";
import { Confirm } from "notiflix";
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

const Dashboard = () => {
  const { user, userRole, logout } = useAuth();
  const handleLogout = () => {
    Confirm.show(
      "Are you sure to logout?",
      "you can't undo it!",
      "Yes",
      "No",
      () => {
        toast.promise(
          logout().then(() => {}),
          {
            loading: "logouting...",
            success: <b>Logout!</b>,
            error: <b>Could not logout.</b>,
          }
        );
      },
      () => {},
      {}
    );
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

  return (
    <>
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="flex items-center p-4 gap-2 justify-start lg:hidden">
            <label
              htmlFor="my-drawer-2"
              className="drawer-button btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <h1 className="text-3xl font-semibold font-serif">Survey Genius</h1>
          </div>
          <div>
              <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu font-semibold tracking-wide p-4 w-80 min-h-full glass text-base-content">
            <h1 className="text-3xl px-4 py-6 font-semibold font-serif">
              Survey Genius
            </h1>
            {userRole === "pro-user" && (
              <>
                <li>
                  <Link to="/dashboard/user/surveys">User Serveys</Link>
                </li>
                <li>
                  <Link to="/dashboard/user/my-reports">My Reports</Link>
                </li>

                <li>
                  <Link to="user/comments">Comments</Link>
                </li>
              </>
            )}
            {userRole === "surveyor" && (
              <>
                <li>
                  <Link to="/dashboard/surveyor/create">Create Survey</Link>
                </li>
                <li>
                  <Link to="/dashboard/surveyor/update">Update Survey</Link>
                </li>

                <li>
                  <Link to="/dashboard/surveyor/surveys">MY Surveys</Link>
                </li>
              </>
            )}
            {userRole === "user" && (
              <>
                <li>
                  <Link to="/dashboard/user/surveys">User Serveys</Link>
                </li>
                <li>
                  <Link to="/dashboard/user/my-reports">My Reports</Link>
                </li>
                {userRole === "pro-user" && (
                  <li>
                    <Link to="user/comments">Comments</Link>
                  </li>
                )}
              </>
            )}
            {userRole === "admin" && (
              <>
                <li>
                  <Link to="/dashboard/admin/users">Manage Users</Link>
                </li>
                <li>
                  <Link to="/dashboard/admin/surveys">Manage Surveys</Link>
                </li>
                <li>
                  <Link to="/dashboard/admin/payments">Payments</Link>
                </li>
              </>
            )}
            <div className="divider px-4"></div>
            <li className="tracking-wide">
              <Link to="/">Home</Link>
            </li>
            <li className="tracking-wide">
              <Link to="/surveys">Surveys</Link>
            </li>{" "}
            <li>
              <select
                className="border border-[#7f7e7f38]"
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
            </li>
            {userRole === "user" ? (
              <li className="my-2 border-[#7f7e7f38] border shadow-inner tracking-wide rounded-3xl">
                <Link to="/payment">
                  <LuCrown />
                  Try Pro
                </Link>
              </li>
            ) : (
              ""
            )}
            <li onClick={userInformation}>
              <a>{user?.displayName}</a>
            </li>
            {user && (
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Dashboard;
