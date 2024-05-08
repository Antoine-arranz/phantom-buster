import Section from "../../components/Layout/Section";
import SearchBar from "../../components/SearchBar/SearchBar";
import { ApiEnum, KEY, useApiHook } from "../../hooks/apiHook";
import CategoriesFilter from "../../components/CategoriesFilter/CategoriesFilter";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { IPhantoms } from "../../data/phantoms";
import createListFromEnum from "../../utils/listFromEnum";
import { useLocalStorage } from "../../hooks/localStorageHook";
import { useEffect } from "react";
import PhantomList from "../../components/PhantomList/PhantomList";

enum LaunchType {
  Automatic = "Automatic",
  Manual = "Manual",
}

enum Activity {
  Running = "Running",
  Enabled = "Enabled",
  Paused = "Paused",
  InError = "In Error",
}
const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { removeItem } = useLocalStorage();
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
  };

  const onResetStorage = () => {
    removeItem(KEY);
  };

  const onClickClearFilters = () => {
    setSearchParams("");
  };

  const retrievePhantomsWithParams = async () => {
    const platformFilter = searchParams.get("Platforms");
    if (platformFilter) {
      await getPhantoms([platformFilter]);
    } else {
      await getPhantoms();
    }
  };

  useEffect(() => {
    retrievePhantomsWithParams();
  }, [searchParams]);

  const activityCategories = createListFromEnum(Activity);
  const launchTypeCategories = createListFromEnum(LaunchType);

  return (
    <Section>
      <h1 className='text-3xl font-extrabold'>Dashboard</h1>
      <div className='mt-9 flex flex-col lg:flex-row lg:gap-10'>
        <aside className='hidden min-w-[250px] select-none lg:flex lg:flex-col lg:gap-5'>
          <SearchBar />
          {phantomResult && categorieResult && (
            <div className='flex justify-between'>
              <h2 className='text-md font-bold'>Filters</h2>
              {searchParams.size !== 0 && (
                <Button
                  className='text-bcg-filter font-bold'
                  handleOnClick={() => onClickClearFilters()}
                >
                  Clear filters
                </Button>
              )}
            </div>
          )}
          {phantomResult && launchTypeCategories && (
            <CategoriesFilter
              title='Launch type'
              categories={launchTypeCategories}
            />
          )}

          {phantomResult && activityCategories && (
            <CategoriesFilter
              title='Activity'
              categories={activityCategories}
            />
          )}

          {categorieResult && (
            <CategoriesFilter title='Platforms' categories={categorieResult} />
          )}
          <Button
            className='h-4 flex items-center justify-center mt-1 px-3 py-3 w-full text-white  font-light bg-bcg-filter rounded-md hover:bg-bcg-filter-hover'
            type='submit'
            handleOnClick={onResetStorage}
          >
            Reset storage
          </Button>
        </aside>
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
