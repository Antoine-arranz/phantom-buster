import { Route, Routes } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import PhantomDetail from "../views/PhantomDetail";
import { NotFound } from "../views/NotFound/NotFound";

export const Router = () => {
  return (
    <Routes>
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/phantom/:id' element={<PhantomDetail />} />
      <Route path='*' element={<NotFound />} /> {/* Route 404 */}
    </Routes>
  );
};

export default Router;
