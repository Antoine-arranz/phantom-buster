import { ButtonHTMLAttributes, ReactNode } from "react";
import Button from "../Button/Button";

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
    <Button className={className} handleOnClick={onClick}>
      <span>{children} </span>
      {isActive && (
        <input
          type='checkbox'
          defaultChecked
          className='checkbox-primary checkbox checkbox-xs self-center '
        />
      )}
    </Button>
  );
};

export default FilterButton;
