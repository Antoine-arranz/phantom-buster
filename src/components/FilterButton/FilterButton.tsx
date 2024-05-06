import { ButtonHTMLAttributes, ReactNode } from "react";

interface FilterButtonProps extends ButtonHTMLAttributes<HTMLUListElement> {
  children: ReactNode;
  onClick: () => void;
  isActive: boolean;
}

const FilterButton = ({
  children,
  onClick,
  className,
  isActive,
}: FilterButtonProps) => {
  return (
    <button className={className} onClick={onClick}>
      <span>{children} </span>
      {isActive && (
        <input
          type='checkbox'
          defaultChecked
          className='checkbox-primary checkbox checkbox-xs self-center '
        />
      )}
    </button>
  );
};

export default FilterButton;
