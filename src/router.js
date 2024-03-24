// Imports
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Authentication from "pages/Authentication";
import Pricing from "pages/Pricing";
import Create from  "pages/Create";

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/authentication",
    element: <Authentication />,
  },
  {
    path: "/pricing",
    element: <Pricing/>
  }, {
    path: "/create",
    element: <Create/>
  }
]);

export default router;