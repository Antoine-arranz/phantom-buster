import Section from "../../components/Layout/Section";
import PhantomCard from "../../components/PhantomCard/PhantomCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import { ApiEnum, KEY, useApiHook } from "../../hooks/apiHook";
import CategoriesFilter from "../../components/CategoriesFilter/CategoriesFilter";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { IPhantoms } from "../../data/phantoms";
import createListFromEnum from "../../utils/listFromEnum";
import { useLocalStorage } from "../../hooks/localStorageHook";
import { useEffect } from "react";

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

  const { result: phantomResult, getPhantoms } = useApiHook<IPhantoms[]>(
    ApiEnum.Phantom
  );

  const { result: categorieResult } = useApiHook<string[]>(ApiEnum.Categorie);

  const { removeItem } = useLocalStorage();

  const onClickClearFilters = () => {
    setSearchParams("");
  };

  useEffect(() => {
    const platformFilter = searchParams.get("Platforms");
    if (platformFilter) {
      getPhantoms([platformFilter]);
    } else {
      getPhantoms();
    }
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
            handleOnClick={() => removeItem(KEY)}
          >
            Reset storage
          </Button>
        </aside>
        <div className='flex flex-col gap-10 w-full'>
          {phantomResult &&
            phantomResult.map((phantomCard, index: number) => {
              return (
                <PhantomCard
                  key={index}
                  phantomCard={phantomCard}
                ></PhantomCard>
              );
            })}
        </div>
      </div>
    </Section>
  );
};

export default Dashboard;
