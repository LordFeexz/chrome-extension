import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../views/login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default router;
