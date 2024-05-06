import Section from "../../components/Layout/Section";
import PhantomCard from "../../components/PhantomCard/PhantomCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import { ApiEnum, useApiHook } from "../../hooks/apiHook";
import CategoriesFilter from "../../components/CategoriesFilter/CategoriesFilter";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { IPhantoms } from "../../data/phantoms";

enum LaunchType {
  Automatic = "Automatic",
  Manual = "Manual",
}

enum ActivityState {
  Running = "Running",
  Enabled = "Enabled",
  Paused = "Paused",
  InError = "In Error",
}
const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [phantomResult, error, loading] = useApiHook<IPhantoms[]>(
    ApiEnum.Phantom
  );
  const [categorieResult, categorieLoading, categorieError] = useApiHook<
    string[]
  >(ApiEnum.Categorie);
  function createListFromEnum(enumObj: any): string[] {
    const enumKeys = Object.keys(enumObj).filter((key) =>
      isNaN(Number(enumObj[key]))
    );
    return enumKeys.map((key) => enumObj[key]);
  }

  function onClickClearFilters() {
    setSearchParams("");
  }

  const activityCategories = createListFromEnum(ActivityState);
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
