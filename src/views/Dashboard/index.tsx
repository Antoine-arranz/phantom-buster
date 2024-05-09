import Section from "../../components/Layout/Section";

import PhantomList from "../../components/PhantomList/PhantomList";
import FilterSideBar from "../../components/FilterSideBar/FilterSideBar";
import { useApiHook } from "../../hooks/apiHook";

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

  const handleDeletePhantom = async (id: string) => {
    await deletePhantom(id);
    await getCategories();
  };
  return (
    <Section>
      <h1 className='text-3xl font-extrabold'>Dashboard</h1>
      <div className='mt-9 flex flex-col lg:flex-row lg:gap-10'>
        <FilterSideBar categories={categories} getCategories={getCategories} />
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
    </Section>
  );
};

export default Dashboard;
