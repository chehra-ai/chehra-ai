// Imports
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Authentication from "pages/Authentication";

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/authentication",
    element: <Authentication />,
  }
]);

export default router;