import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { BrowserRouter } from "react-router-dom";
import { Router } from ".././router/router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <ToastContainer
          autoClose={5000}
          hideProgressBar={false}
          position='top-center'
          theme='dark'
        />

        <main className='bg-bcg-primary h-100'>
          <Router />
        </main>
      </BrowserRouter>{" "}
      <Footer></Footer>
    </div>
  );
}

export default App;
