import CategoriesList from "../CategoriesList/CategoriesList";
import { useSearchParams } from "react-router-dom";

export interface CategoriesFilterProps {
  title: string;
  categories: Array<string>;
}
const CategoriesFilter = ({ title, categories }: CategoriesFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categorySearchParams = searchParams.get(title);

  const handleItemClick = (index: number, isActive: boolean) => {
    setSearchParams((prev) => {
      if (isActive) {
        prev.delete(title);
      } else {
        searchParams.set(title, categories[index]);
      }
      return prev;
    });
  };
  return (
    <div className='mb-4'>
      <p className='text-sm text-secondary-text font-medium'>{title}</p>
      <ul>
        {categories.map((categorie: string, index: number) => {
          return (
            <CategoriesList
              onClick={() =>
                handleItemClick(index, categorySearchParams === categorie)
              }
              isActive={categorySearchParams === categorie}
              key={index}
              title='Platforms'
            >
              {categorie}
            </CategoriesList>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoriesFilter;
