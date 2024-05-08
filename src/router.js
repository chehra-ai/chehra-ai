// Imports
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Create from "pages/Create";
import Authentication from "pages/Authentication";
import Pricing from "pages/Pricing";
import Page404 from "pages/Page404";
import ViewInfluencer from "influencerGeneratorPages/ViewInfluencer";
import CreateInfluencer from "influencerGeneratorPages/CreateInfluencer";
import CreateSameInfluencerImage from "influencerGeneratorPages/CreateSameInfluencerImage";

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
  },
  {
    path : "/viewinfluencer",
    element : <ViewInfluencer/>
  },
  {
    path : "/createinfluencer",
    element : <CreateInfluencer/>
  },
  {
    path : "/createimageofsameinfluencer",
    element : <CreateSameInfluencerImage/>
  },
  {
    path : "*",
    element : <Page404/>
  }
]);

export default router;