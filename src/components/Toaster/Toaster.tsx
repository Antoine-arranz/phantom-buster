import { ToastContainer } from "react-toastify";

const Toaster = () => {
  return (
    <ToastContainer
      autoClose={5000}
      hideProgressBar={false}
      position='top-center'
      theme='dark'
    />
  );
};

export default Toaster;
