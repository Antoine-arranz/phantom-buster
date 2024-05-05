import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { RouterProvider } from "react-router-dom";
import router from ".././router/router";

function App() {
  return (
    <div>
      <Header></Header>
      <main className='bg-bcg-primary h-100'>
        <RouterProvider router={router} />
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
