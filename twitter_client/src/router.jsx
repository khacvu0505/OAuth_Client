import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import VerifyEmail from "./VerifyEmail";
import VerifyForgotPasswordToken from "./VerifyForgotPasswordToken";
import ForgotPassword from "./ResetPassword";
import Chat from "./Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login/oauth",
    element: <Login />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/reset-password",
    element: <VerifyForgotPasswordToken />,
  },
  {
    path: "/forgot-passsword",
    element: <ForgotPassword />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
]);
export default router;
