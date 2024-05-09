import { Link } from "react-router-dom";

const NotFound = () => (
  <div className=' h-[calc(100vh-200px)] bg-base-200 flex justify-center items-center'>
    <div className='max-w-md flex-col flex gap-10'>
      <h1 className='text-5xl font-bold'>Page not found</h1>
      <Link
        className='flex m-auto px-2 py-1 text-white  bg-bcg-filter rounded-md hover:bg-bcg-filter-hover'
        to={"/dashboard"}
      >
        Return to the dashboard
      </Link>
    </div>
  </div>
);

export { NotFound };
