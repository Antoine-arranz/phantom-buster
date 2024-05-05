import { HTMLAttributes, ReactNode } from "react";

interface CategoriesFilterProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

const CategoriesFilter = ({ children }: CategoriesFilterProps) => {
  return (
    <ul className='list-none'>
      <li className='mt-1 pl-3 flex list-none hover:cursor-pointer text-lg'>
        {children}
      </li>
    </ul>
  );
};

export default CategoriesFilter;
