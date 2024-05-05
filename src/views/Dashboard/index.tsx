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
  console.log("icicici Dashboard");
  const [phantomResult, phantomLoading, phantomError] = useApiHook(
    ApiEnum.Phantom
  );
  const [categorieResult, categorieLoading, categorieError] = useApiHook(
    ApiEnum.Categorie
  );
  console.log("categorieResult", categorieResult);

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
      <div>
        <h1>Dashboard</h1>
        <div className='mt-9 flex flex-col lg:flex-row lg:gap-10'>
          <aside className='hidden min-w-[250px] select-none lg:block'>
            <SearchBar />
            {launchTypeCategories && (
              <>
                <p>Launch type</p>
                {launchTypeCategories.map((categorie: string) => {
                  return (
                    <CategoriesFilter title='Platforms' key={categorie}>
                      {categorie}
                    </CategoriesFilter>
                  );
                })}
              </>
            )}
            {activityCategories && (
              <>
                <p>Activity</p>
                {activityCategories.map((categorie: string) => {
                  return (
                    <CategoriesFilter title='Platforms' key={categorie}>
                      {categorie}
                    </CategoriesFilter>
                  );
                })}
              </>
            )}

            {categorieResult && (
              <>
                <p>Platforms</p>
                {categorieResult.map((categorie: string) => {
                  return (
                    <CategoriesFilter title='Platforms' key={categorie}>
                      {categorie}
                    </CategoriesFilter>
                  );
                })}
              </>
            )}
          </aside>
          <div className='flex-1'>
            {phantomResult &&
              phantomResult.map((phantomCard: any) => {
                console.log("zaeaa", phantomCard);
                return <PhantomCard phantomCard={phantomCard}></PhantomCard>;
              })}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Dashboard;
