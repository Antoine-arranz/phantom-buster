import { Route, Routes } from "react-router-dom";
import Dashboard from "../views/Dashboard";

export const Router = () => {
  return (
    <Routes>
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
};

export default Router;
