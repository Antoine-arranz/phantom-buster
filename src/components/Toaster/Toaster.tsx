import { ToastContainer } from "react-toastify";

const Toaster = () => {
  return (
    <ToastContainer
      autoClose={5000}
      hideProgressBar
      position='top-center'
      theme='dark'
    />
  );
};

export default Toaster;
