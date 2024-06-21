import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserLogin = ({ children }) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }  else {
    return children;
  }
};

export default UserLogin;
