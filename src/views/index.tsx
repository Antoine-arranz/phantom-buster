import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { BrowserRouter } from "react-router-dom";
import { Router } from ".././router/router";
import Toaster from "../components/Toaster/Toaster";
import { Fragment } from "react/jsx-runtime";
import Main from "../components/Layout/Main";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Header></Header>
        <Toaster />
        <Main>
          <Router />
        </Main>
        <Footer></Footer>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
