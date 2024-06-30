// Imports
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "pages/Login";
import Signup from "pages/Signup";
// import Pricing from "pages/Pricing";
import Create from "pages/Create";
import Image from "pages/Image";  // Import the Image component
import NotFound from "pages/NotFound";
import ProtectedRoute from "components/auth/ProtectedRoute";
import Pricing from "pages/Pricing";
import Credits from "pages/Credits";
import About from "pages/About";
import Company from "pages/Company";
import Contact from "pages/Contact";
import Privacy from "pages/Privacy";
import Refund from "pages/Refund";
import Team from "pages/Team";
import Terms from "pages/Terms";
import Vision from "pages/Vision";

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
  {
    path: "/pricing",
    element: <Pricing/>
  },
  {
    path: '/credits',
    element: < Credits />
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/company",
    element: <Company />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/refund",
    element: <Refund />,
  },
  {
    path: "/team",
    element: <Team />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
  {
    path: "/vision",
    element: <Vision />,
  },
  {
    path: '/create',
    element: (
      <ProtectedRoute>
        <Create />
      </ProtectedRoute>
    ),
  },
  {
    path: '/image/:id',  // Add this route
    element: (
      <ProtectedRoute>
        <Image />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
