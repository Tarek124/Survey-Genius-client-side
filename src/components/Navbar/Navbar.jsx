import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useSwal from "../../hooks/useSwal";
import { LuCrown } from "react-icons/lu";
import { FaCrown } from "react-icons/fa6";

const Navbar = () => {
  const { user, logout, userRole } = useAuth();
  const { swalSuccess } = useSwal();
  const handleLogout = () => {
    logout().then(() => swalSuccess("logout success"));
  };
  const navLink = (
    <>
      <li className="tracking-wide">
        <Link to="/">Home</Link>
      </li>
      <li className="tracking-wide">
        <Link to="/surveys">Surveys</Link>
      </li>
      {user ? (
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
        <li className="border rounded shadow-inner tracking-widef">
          <Link to="/payment">
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
    <div className="navbar bg-white bg-opacity-40 backdrop-blur-md fixed top-0 left-0 z-10 lg:px-32 shadow-md">
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
          className="text-xl xl:text-3xl p-2 font-semibold font-serif"
        >
          Survey Genius
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold">{navLink}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <div className="flex items-center gap-2">
              {userRole === "pro-user" && (
                <FaCrown className="text-yellow-500 text-2xl " />
              )}
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
              <li>
                <a>{user?.displayName}</a>
              </li>
              <li className="w-full overflow-x-hidden">
                <a>{user?.email}</a>
              </li>
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <Link className="mr-2 font-semibold text-blue-500" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
