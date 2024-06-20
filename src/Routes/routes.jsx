import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import Home from "../layout/Home";
import Dashboard from "../layout/Dashboard";
import NotFoundPage from "../components/NotFoundPage/NotFoundPage";
import Login from "../Register/Login";
import Registation from "../Register/Registation";
import Surveys from "../Pages/Surveys/Surveys";
import PrivateRoute from "./PrivateRoute";
import UserLogin from "./UserLogin";
import Payment from "../Pages/Payment/Payment";
import SurveyDetail from "../components/SurveyDetail/SurveyDetail";
import UserRoutes from "./UserRoutes";
import UserSurveys from "../Pages/userDashboard/UserSurveys/UserSurveys";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    element: <Home />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/login",
        element: (
          <UserLogin>
            <Login />
          </UserLogin>
        ),
      },
      {
        path: "/register",
        element: (
          <UserLogin>
            <Registation />
          </UserLogin>
        ),
      },
      { path: "/surveys", element: <Surveys /> },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: <SurveyDetail />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "user/surveys",
        element: (
          <UserRoutes>
            <UserSurveys />
          </UserRoutes>
        ),
      },
    ],
  },
]);

export default router;
