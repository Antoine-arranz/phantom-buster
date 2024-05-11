import { useSearchParams } from "react-router-dom";
import { KEY } from "../../hooks/apiHook";
import createListFromEnum from "../../utils/listFromEnum";
import Button from "../Button/Button";
import CategoriesFilter from "./CategoriesFilter/CategoriesFilter";
import SearchBar from "../SearchBar/SearchBar";
import { useLocalStorage } from "../../hooks/localStorageHook";

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

interface PhantomListProps {
  categories: string[] | undefined;
}

export const PLATFORMS = "Platforms";

const FilterSideBar = ({ categories }: PhantomListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { removeItem } = useLocalStorage();

  const onResetStorage = () => {
    removeItem(KEY);
  };

  const onClickClearFilters = () => {
    setSearchParams("");
  };

  const activityCategories = createListFromEnum(Activity);
  const launchTypeCategories = createListFromEnum(LaunchType);
  return (
    <aside className='min-w-[250px] select-none'>
      <SearchBar />
      <div className='hidden mt-4  lg:flex lg:flex-col lg:gap-5'>
        {categories && (
          <div className='flex justify-between'>
            <h2 className='text-md font-bold'>Filters</h2>
            {searchParams.size !== 0 && (
              <Button
                className='text-primary font-bold'
                handleOnClick={() => onClickClearFilters()}
              >
                Clear filters
              </Button>
            )}
          </div>
        )}
        {launchTypeCategories && (
          <CategoriesFilter
            title='Launch type'
            categories={launchTypeCategories}
          />
        )}

        {activityCategories && (
          <CategoriesFilter title='Activity' categories={activityCategories} />
        )}

        {categories && categories.length > 0 && (
          <CategoriesFilter title='Platforms' categories={categories} />
        )}
        <Button
          className='h-4 flex items-center justify-center mt-1 px-3 py-3 w-full text-white  font-light bg-primary rounded-md hover:bg-filter-hover'
          type='submit'
          handleOnClick={onResetStorage}
        >
          Reset storage
        </Button>
      </div>
    </aside>
  );
};

export default FilterSideBar;
