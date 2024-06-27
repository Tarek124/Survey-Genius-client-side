import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { CiTrash } from "react-icons/ci";
import { useState } from "react";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import toast, { Toaster } from "react-hot-toast";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [roleFilter, setRoleFilter] = useState(""); // State for role filter

  const {
    data: allUsers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allusers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/allUsers");
      return res.data;
    },
  });

  const handleRole = ({ role, userId }) => {
    toast.promise(
      axiosSecure.post("/admin/role", { role, userId }).then((res) => {
        if (res?.data?.modifiedCount) {
          refetch();
        }
      }),
      {
        loading: "updating...",
        success: <b>User Role updated!</b>,
        error: <b>Could not save.</b>,
      }
    );
  };

  const handleFilterChange = (e) => {
    setRoleFilter(e.target.value);
  };

  const filteredUsers = allUsers.filter((user) =>
    roleFilter ? user.role === roleFilter : true
  );

  const handleUser = ({ id, email }) => {
    Confirm.show(
      "Are you sure ?",
      "you can't undo it!",
      "Yes",
      "No",
      () => {
        toast.promise(
          axiosSecure.post("/deleteUser", { id, email }).then((res) => {
            if (res?.data?.deletedCount > 0) {
              refetch();
            }
          }),
          {
            loading: "deleting...",
            success: <b>User deleted!</b>,
            error: <b>Could not delete.</b>,
          }
        );
      },
      () => {},
      {}
    );
  };
  return (
    <div className="sm:m-4 m-2 p-4 sm:p-8 shadow-md border border-[#7f7e7f38] rounded">
      <h1 className="text-xl font-bold ">All User</h1>
      <div className="my-4">
        <div className="label">
          <span className="label-text">Filter by Role:</span>
        </div>
        <select
          className="select select-bordered w-40"
          onChange={handleFilterChange}
          value={roleFilter}
        >
          <option value="">All</option>
          <option value="admin">Admin</option>
          <option value="surveyor">Surveyor</option>
          <option value="pro-user">Pro User</option>
          <option value="user">User</option>
        </select>
      </div>

      {!isLoading ? (
        <div className="overflow-x-auto">
          <table className="table table-xs sm:table-lg">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user, inx) => (
                <tr key={user._id}>
                  <th>{inx + 1}</th>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="hover:underline m-1"
                      >
                        {user?.role}
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                      >
                        <li
                          onClick={() =>
                            handleRole({ role: "admin", userId: user._id })
                          }
                        >
                          <a>admin</a>
                        </li>
                        <li
                          onClick={() =>
                            handleRole({ role: "surveyor", userId: user._id })
                          }
                        >
                          <a>surveyor</a>
                        </li>
                        <li
                          onClick={() =>
                            handleRole({ role: "pro-user", userId: user._id })
                          }
                        >
                          <a>pro-user</a>
                        </li>
                        <li
                          onClick={() =>
                            handleRole({ role: "user", userId: user._id })
                          }
                        >
                          <a>user</a>
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleUser({ id: user._id, email: user?.email })
                      }
                      className="btn rounded-full my-1"
                    >
                      <CiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      ) : (
        <div className="h-screen justify-center flex items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
