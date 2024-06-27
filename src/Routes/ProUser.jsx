import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProUser = ({ children }) => {
  const { userRole, user } = useAuth();
  if (userRole && user) {
    if (userRole === "pro-user") {
      return <Navigate to="/" />;
    } else {
      return children;
    }
  }
};

export default ProUser;
