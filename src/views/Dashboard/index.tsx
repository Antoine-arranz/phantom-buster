import PhantomList from "../../components/Phantoms/PhantomList/PhantomList";
import FilterSideBar from "../../components/FilterSideBar/FilterSideBar";
import { useApiHook } from "../../hooks/apiHook";
import { useEffect } from "react";

const Dashboard = () => {
  const {
    phantoms,
    categories,
    getPhantoms,
    deletePhantom,
    getCategories,
    renamePhantom,
    duplicatedPhantom,
  } = useApiHook();

  const handleDeletePhantom = async (id: string): Promise<void> => {
    await deletePhantom(id);
    await getCategories();
  };

  useEffect(() => {
    getPhantoms();
    getCategories();
  }, []);

  return (
    <div className='max-w-7xl px-5 py-10 m-auto'>
      <h1 className='text-3xl font-extrabold'>Dashboard</h1>
      <div className='mt-9 flex flex-col lg:flex-row lg:gap-10'>
        <FilterSideBar categories={categories} />
        <div className='flex flex-col gap-10 w-full'>
          {phantoms && (
            <PhantomList
              phantoms={phantoms}
              getPhantoms={getPhantoms}
              deletePhantom={handleDeletePhantom}
              renamePhantom={renamePhantom}
              duplicatedPhantom={duplicatedPhantom}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
