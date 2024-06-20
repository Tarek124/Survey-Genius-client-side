import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (user) {
    return children;
  } else if (loading) {
    return (
      <div className="h-screen justify-center flex items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
};

export default PrivateRoute;
