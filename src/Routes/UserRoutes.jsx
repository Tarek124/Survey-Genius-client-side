import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserRoutes = ({ children }) => {
  const { userRole, loading, user } = useAuth();
  if (user && userRole) {
    if ((user && userRole === "user") || userRole === "pro-user") {
      return children;
    } else if (loading) {
      return (
        <div className="h-screen justify-center flex items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      );
    } else {
      return <Navigate to="/" />;
    }
  }
};

export default UserRoutes;
