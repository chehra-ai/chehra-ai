// Imports
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "pages/Login";
import Signup from "pages/Signup";
// import Pricing from "pages/Pricing";
import Create from "pages/Create";
import NotFound from "pages/NotFound";

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  // {
  //   path: "/pricing",
  //   element: <Pricing/>
  // },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
