import { FunctionComponent, ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  handleOnClick?: () => void;
  className?: string;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  handleOnClick,
  className,
}) => {
  return (
    <button className={className} onClick={handleOnClick}>
      {children}
    </button>
  );
};

export default Button;
