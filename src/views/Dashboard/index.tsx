import Section from "../../components/Layout/Section";
import { ApiEnum, useApiHook } from "../../hooks/apiHook";
import { useSearchParams } from "react-router-dom";
import { IPhantoms } from "../../data/phantoms";
import { useEffect } from "react";
import PhantomList from "../../components/PhantomList/PhantomList";
import FilterSideBar from "../../components/FilterSideBar/FilterSideBar";
import { SEARCH_KEY } from "../../components/SearchBar/SearchBar";
import { useLocalStorage } from "../../hooks/localStorageHook";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const {
    result: phantomResult,
    getPhantoms,
    deletePhantom,
  } = useApiHook<IPhantoms>(ApiEnum.Phantom);
  const { result: categorieResult, getCategories } = useApiHook<string[]>(
    ApiEnum.Categorie
  );

  const handleDeletePhantom = async (id: string) => {
    await deletePhantom(id);
    await retrievePhantomsWithParams();
    await getCategories();
    console.log("OK");
  };

  const retrievePhantomsWithParams = async () => {
    const platformFilter = searchParams.get("Platforms");
    const searchFilter = searchParams.get(SEARCH_KEY);
    if (platformFilter || searchFilter) {
      await getPhantoms({ platform: platformFilter, search: searchFilter });
    } else {
      await getPhantoms();
    }
  };

  useEffect(() => {
    retrievePhantomsWithParams();
  }, [searchParams]);

  return (
    <Section>
      <h1 className='text-3xl font-extrabold'>Dashboard</h1>
      <div className='mt-9 flex flex-col lg:flex-row lg:gap-10'>
        <FilterSideBar categories={categorieResult} />
        <div className='flex flex-col gap-10 w-full'>
          <PhantomList
            phantoms={phantomResult}
            handleDeletePhantom={handleDeletePhantom}
          />
        </div>
      </div>
    </Section>
  );
};

export default Dashboard;
