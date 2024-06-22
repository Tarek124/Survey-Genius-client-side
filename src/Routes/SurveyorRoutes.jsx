import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SurveyorRoutes = ({ children }) => {
  const { userRole, user } = useAuth();
  if (userRole && user) {
    if (userRole === "surveyor") {
      return children;
    } else {
      return <Navigate to="/" />;
    }
  }
};

export default SurveyorRoutes;
