import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { RouterProvider } from "react-router-dom";
import router from ".././router/router";

function App() {
  console.log("APPP");
  return (
    <div>
      <Header></Header>
      <main className='bg-bcg-primary h-100 px-4 py-4'>
        <RouterProvider router={router} />
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
