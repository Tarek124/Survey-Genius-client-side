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
import MyReports from "../Pages/userDashboard/MyReports/MyReports";
import Comments from "../Pages/userDashboard/Comments/Comments";
import AdminRoutes from "./AdminRoutes";
import AllUsers from "../Pages/AdminDashboard/AllUsers/AllUsers";
import PaymentAndSurveysResponses from "../Pages/AdminDashboard/PaymentAndSurveysResponses/PaymentAndSurveysResponses";
import PublishUnpublishSurveys from "../Pages/AdminDashboard/PublishUnpublishSurveys/PublishUnpublishSurveys";
import CreateSurveys from "../Pages/SurveyorDashboard/CreateSurveys/CreateSurveys";
import SurveyorRoutes from "./SurveyorRoutes";
import UpdateSurveys from "../Pages/SurveyorDashboard/UpdateSurveys/UpdateSurveys";
import UpdateForm from "../Pages/SurveyorDashboard/UpdateSurveys/UpdateForm";
import SurveyorSurveys from "../Pages/SurveyorDashboard/SurveyorSurveys/SurveyorSurveys";

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
        element: (
          <PrivateRoute>
            <SurveyDetail />
          </PrivateRoute>
        ),
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
      {
        path: "user/my-reports",
        element: (
          <UserRoutes>
            <MyReports />
          </UserRoutes>
        ),
      },
      {
        path: "user/comments",
        element: (
          <UserRoutes>
            <Comments />
          </UserRoutes>
        ),
      },
      {
        path: "admin/users",
        element: (
          <AdminRoutes>
            <AllUsers />
          </AdminRoutes>
        ),
      },
      {
        path: "admin/surveys",
        element: (
          <AdminRoutes>
            <PublishUnpublishSurveys />
          </AdminRoutes>
        ),
      },
      {
        path: "admin/payments",
        element: (
          <AdminRoutes>
            <PaymentAndSurveysResponses />
          </AdminRoutes>
        ),
      },
      {
        path: "surveyor/create",
        element: (
          <SurveyorRoutes>
            <CreateSurveys />
          </SurveyorRoutes>
        ),
      },
      {
        path: "surveyor/update",
        element: (
          <SurveyorRoutes>
            <UpdateSurveys />
          </SurveyorRoutes>
        ),
      },
      {
        path: "surveyor/surveys",
        element: (
          <SurveyorRoutes>
            <SurveyorSurveys />
          </SurveyorRoutes>
        ),
      },
      {
        path: "surveyor/update/:id",
        element: (
          <SurveyorRoutes>
            <UpdateForm />
          </SurveyorRoutes>
        ),
      },
    ],
  },
]);

export default router;
