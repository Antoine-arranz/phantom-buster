import { HTMLAttributes, ReactNode } from "react";

interface CategoriesFilterProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

const CategoriesFilter = ({ children }: CategoriesFilterProps) => {
  return (
    <li className='list-none'>
      <ul className='mt-1 pl-1 pr-1.5 h-4 flex list-none hover:cursor-pointer'>
        {children}
      </ul>
    </li>
  );
};

export default CategoriesFilter;
