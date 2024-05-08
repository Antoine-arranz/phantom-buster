import { useSearchParams } from "react-router-dom";

export const SEARCH_KEY = "search";

function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => {
      if (e.target.value === "") {
        prev.delete(SEARCH_KEY);
      } else {
        prev.set(SEARCH_KEY, e.target.value);
      }
      return prev;
    });
  };
  return (
    <div>
      <input
        value={searchParams.get(SEARCH_KEY) || ""}
        onChange={handleChange}
        className='pl-5 rounded-1.5 w-full text-body-primary font-medium px-2 py-1.5 disabled:text-body-tertiary disabled:placeholder:text-body-tertiary disabled:bg-primary disabled:ring-0 disabled:border-primary disabled:cursor-not-allowed placeholder:italic placeholder:text-body-tertiary placeholder:font-qanelas font-qanelas caret-heading-highlight focus:ring active:ring-0 border-primary focus:border-highlight focus:ring-highlight/20 hover:border-highlight hover:ring hover:ring-highlight/20 autofill:shadow-[0_0_0_100px_white_inset]'
        type='text'
        placeholder='Search'
        name='search'
      />
    </div>
  );
}

export default SearchBar;
