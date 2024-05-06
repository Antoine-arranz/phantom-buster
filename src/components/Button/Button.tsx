interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string;
  handleOnClick: () => void;
  className?: string;
}

const Button = ({ children, handleOnClick, className }: ButtonProps) => {
  return (
    <button className={className} onClick={handleOnClick}>
      {children}
    </button>
  );
};

export default Button;
