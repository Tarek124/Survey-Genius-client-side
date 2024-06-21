import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoutes = ({ children }) => {
  const { userRole, user } = useAuth();
  if (userRole && user) {
    if (userRole === "admin") {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  }
};

export default AdminRoutes;
