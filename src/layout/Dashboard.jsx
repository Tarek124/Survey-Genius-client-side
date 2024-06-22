import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { LuCrown } from "react-icons/lu";
import useSwal from "../hooks/useSwal";
import Swal from "sweetalert2";

const Dashboard = () => {
  const { user, userRole, logout } = useAuth();
  const { swalSuccess } = useSwal();
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        logout().then(() => swalSuccess("logout success"));
      }
    });
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

          <ul className="menu font-semibold tracking-wide p-4 w-80 min-h-full bg-slate-100 text-base-content">
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
            </li>
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
            {user && (
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
