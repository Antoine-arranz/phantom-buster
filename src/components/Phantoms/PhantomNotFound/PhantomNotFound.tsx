import { Link } from "react-router-dom";
import path from "../../../router/path";

interface PhantomNotFoundProps {
  message: string;
  linkToDashboard?: boolean;
}

const PhantomNotFound = ({
  message,
  linkToDashboard,
}: PhantomNotFoundProps) => {
  return (
    <div className='flex justify-center items-center'>
      <div className='max-w-md flex-col flex gap-10'>
        <h1 className='text-3xl font-bold'>{message}</h1>
        {linkToDashboard && (
          <Link
            to={path.dashboard}
            className='flex m-auto px-2 py-1 text-white bg-primary rounded-md hover:bg-filter-hover'
          >
            Return to the dashboard
          </Link>
        )}
      </div>
    </div>
  );
};

export default PhantomNotFound;
