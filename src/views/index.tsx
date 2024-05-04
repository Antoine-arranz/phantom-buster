import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { RouterProvider } from "react-router-dom";
import router from ".././router/router";

function App() {
  return (
    <div>
      <Header></Header>
      <RouterProvider router={router} />
      <Footer></Footer>
    </div>
  );
}

export default App;
