import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoutes = ({ children }) => {
  const { userRole, loading } = useAuth();
  if (userRole === "admin") {
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
};

export default AdminRoutes;
