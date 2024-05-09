import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { BrowserRouter } from "react-router-dom";
import { Router } from ".././router/router";
import Toaster from "../components/Toaster/Toaster";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <Toaster />
        <main className='bg-bcg-primary h-full'>
          <Router />
        </main>
      </BrowserRouter>{" "}
      <Footer></Footer>
    </div>
  );
}

export default App;
