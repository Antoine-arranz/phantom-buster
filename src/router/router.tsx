import { Route, Routes } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import PhantomDetail from "../views/PhantomDetail";

export const Router = () => {
  return (
    <Routes>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/phantom/:id' element={<PhantomDetail />} />
    </Routes>
  );
};

export default Router;
