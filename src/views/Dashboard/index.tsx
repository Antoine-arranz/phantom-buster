import CategoriesFilter from "../../components/CategoriesFilter/CategoriesFilter";
import Section from "../../components/Layout/Section";
import PhantomCard from "../../components/PhantomCard/PhantomCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import { ApiEnum, useApiHook } from "../../hooks/apiHook";

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
            <h2 className='text-md font-bold'>Filters</h2>
          )}
          {phantomResult && launchTypeCategories && (
            <div className='mb-4'>
              <p className='text-sm font-medium'>Launch type</p>
              {launchTypeCategories.map((categorie: string) => {
                return (
                  <CategoriesFilter title='Platforms' key={categorie}>
                    {categorie}
                  </CategoriesFilter>
                );
              })}
            </div>
          )}

          {phantomResult && activityCategories && (
            <div className='mb-4'>
              <p className='text-sm font-medium'>Activity</p>
              {activityCategories.map((categorie: string) => {
                return (
                  <CategoriesFilter title='Platforms' key={categorie}>
                    {categorie}
                  </CategoriesFilter>
                );
              })}
            </div>
          )}

          {categorieResult && (
            <div className='mb-4'>
              <p className='text-sm font-medium'>Platforms</p>
              {categorieResult.map((categorie: string) => {
                return (
                  <CategoriesFilter title='Platforms' key={categorie}>
                    {categorie}
                  </CategoriesFilter>
                );
              })}
            </div>
          )}
        </aside>
        <div className='flex flex-col gap-10 w-full'>
          {phantomResult &&
            phantomResult.map((phantomCard: any) => {
              return <PhantomCard phantomCard={phantomCard}></PhantomCard>;
            })}
        </div>
      </div>
    </Section>
  );
};

export default Dashboard;
