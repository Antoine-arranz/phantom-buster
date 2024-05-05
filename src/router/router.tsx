import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import path from "./path";

const router = createBrowserRouter([
  {
    path: path.dashboard,
    element: <Dashboard />, // Use Dashboard component without invoking it
  },
]);

export default router;
