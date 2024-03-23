// Imports
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Authentication from "pages/Authentication";
import Pricing from "pages/Pricing";

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
  }
]);

export default router;