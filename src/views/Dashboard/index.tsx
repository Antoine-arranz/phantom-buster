import Section from "../../components/Layout/Section";
import PhantomCard from "../../components/PhantomCard/PhantomCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import { ApiEnum, useApiHook } from "../../hooks/apiHook";
import CategoriesFilter from "../../components/CategoriesFilter/CategoriesFilter";

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
  const [phantomResult, phantomLoading, phantomError] = useApiHook(
    ApiEnum.Phantom
  );
  const [categorieResult, categorieLoading, categorieError] = useApiHook(
    ApiEnum.Categorie
  );

  function createListFromEnum(enumObj: any): string[] {
    const enumKeys = Object.keys(enumObj).filter((key) =>
      isNaN(Number(enumObj[key]))
    );
    return enumKeys.map((key) => enumObj[key]);
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
            <div>
              <h2 className='text-md font-bold'>Filters</h2>
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
            phantomResult.map((phantomCard: any, index: number) => {
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
