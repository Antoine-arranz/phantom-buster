import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { BrowserRouter } from "react-router-dom";
import { Router } from ".././router/router";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <main className='bg-bcg-primary h-100'>
          <Router />
        </main>
      </BrowserRouter>{" "}
      <Footer></Footer>
    </div>
  );
}

export default App;
