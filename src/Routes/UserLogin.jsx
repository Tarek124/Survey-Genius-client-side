import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserLogin = ({ children }) => {
  const { user, loading } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  } else if (loading) {
    return (
      <div className="h-screen justify-center flex items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else {
    return children;
  }
};

export default UserLogin;
