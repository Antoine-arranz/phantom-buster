import { VariantProps, cva } from "class-variance-authority";
import { AnchorHTMLAttributes, ReactNode } from "react";
import { NavLink } from "react-router-dom";

export interface NavigationLinkProps
  extends AnchorHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof anchorVariants> {
  children: ReactNode;
  link?: string;
  className: string;
}

const NavigationLink = ({ children, className }: NavigationLinkProps) => {
  return (
    <NavLink className={className} to='/dashboard'>
      {children}
    </NavLink>
  );
};

const anchorVariants = cva("rounded-md", {
  variants: {
    variant: {
      primary: "text-base",
      borderBlue: "border-2 border-blue-600 rounded-3xl px-6 py-2",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export default NavigationLink;
