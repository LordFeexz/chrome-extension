import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../views/login";
import RegisterPage from "../views/register";
import Home from "../views/home";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

export default router;
