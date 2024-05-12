import { useSearchParams } from "react-router-dom";

export const SEARCH_KEY = "search";

const SearchBar = () => {
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
        className='pl-5 outline-none rounded-xl w-full text-body-primary font-medium px-2 py-1.5  placeholder:italic focus:ring active:ring-0 border-primary hover:border-highlight hover:ring'
        type='text'
        placeholder='Search'
        name='search'
      />
    </div>
  );
};

export default SearchBar;
